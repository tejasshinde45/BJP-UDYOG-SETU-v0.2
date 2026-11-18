const VERSION = 5;
const SIZE = 17 + VERSION * 4;
const DATA_CODEWORDS = 108;
const ECC_CODEWORDS = 26;

const multiply = (x: number, y: number): number => {
  let result = 0;
  while (y > 0) {
    if (y & 1) result ^= x;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
    y >>>= 1;
  }
  return result;
};

const reedSolomonRemainder = (data: number[], degree: number): number[] => {
  let generator = [1];
  let root = 1;
  for (let i = 0; i < degree; i += 1) {
    const next = new Array(generator.length + 1).fill(0) as number[];
    generator.forEach((coefficient, index) => {
      next[index] ^= coefficient;
      next[index + 1] ^= multiply(coefficient, root);
    });
    generator = next;
    root = multiply(root, 2);
  }

  const remainder = new Array(degree).fill(0) as number[];
  data.forEach((byte) => {
    const factor = byte ^ remainder[0];
    remainder.shift();
    remainder.push(0);
    for (let i = 0; i < degree; i += 1) remainder[i] ^= multiply(generator[i + 1], factor);
  });
  return remainder;
};

const pushBits = (bits: number[], value: number, length: number) => {
  for (let i = length - 1; i >= 0; i -= 1) bits.push((value >>> i) & 1);
};

/** Creates a local Version 5-L QR matrix for short UTF-8 contact-card payloads. */
export const createQrMatrix = (value: string): boolean[][] | null => {
  const bytes = Array.from(new TextEncoder().encode(value));
  const capacityBits = DATA_CODEWORDS * 8;
  const bits: number[] = [];

  // ECI 26 declares UTF-8, followed by byte mode and its 8-bit length.
  pushBits(bits, 0b0111, 4);
  pushBits(bits, 26, 8);
  pushBits(bits, 0b0100, 4);
  pushBits(bits, bytes.length, 8);
  bytes.forEach((byte) => pushBits(bits, byte, 8));
  if (bits.length > capacityBits) return null;
  for (let i = 0, count = Math.min(4, capacityBits - bits.length); i < count; i += 1) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const data: number[] = [];
  for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((acc, bit) => (acc << 1) | bit, 0));
  for (let pad = 0; data.length < DATA_CODEWORDS; pad += 1) data.push(pad % 2 === 0 ? 0xec : 0x11);
  const codewords = [...data, ...reedSolomonRemainder(data, ECC_CODEWORDS)];

  const modules = Array.from({ length: SIZE }, () => new Array(SIZE).fill(false) as boolean[]);
  const isFunction = Array.from({ length: SIZE }, () => new Array(SIZE).fill(false) as boolean[]);
  const setFunction = (x: number, y: number, dark: boolean) => {
    if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
      modules[y][x] = dark;
      isFunction[y][x] = true;
    }
  };

  const drawFinder = (centerX: number, centerY: number) => {
    for (let dy = -4; dy <= 4; dy += 1) {
      for (let dx = -4; dx <= 4; dx += 1) {
        const distance = Math.max(Math.abs(dx), Math.abs(dy));
        setFunction(centerX + dx, centerY + dy, distance !== 2 && distance !== 4);
      }
    }
  };

  drawFinder(3, 3);
  drawFinder(SIZE - 4, 3);
  drawFinder(3, SIZE - 4);

  for (let i = 8; i < SIZE - 8; i += 1) {
    if (!isFunction[6][i]) setFunction(i, 6, i % 2 === 0);
    if (!isFunction[i][6]) setFunction(6, i, i % 2 === 0);
  }

  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      setFunction(SIZE - 7 + dx, SIZE - 7 + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
  }

  // Reserve format information cells before placing data.
  for (let i = 0; i <= 5; i += 1) setFunction(8, i, false);
  setFunction(8, 7, false);
  setFunction(8, 8, false);
  setFunction(7, 8, false);
  for (let i = 9; i < 15; i += 1) setFunction(14 - i, 8, false);
  for (let i = 0; i < 8; i += 1) setFunction(SIZE - 1 - i, 8, false);
  for (let i = 8; i < 15; i += 1) setFunction(8, SIZE - 15 + i, false);
  setFunction(8, SIZE - 8, true);

  let bitIndex = 0;
  let upward = true;
  for (let right = SIZE - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vertical = 0; vertical < SIZE; vertical += 1) {
      const y = upward ? SIZE - 1 - vertical : vertical;
      for (let offset = 0; offset < 2; offset += 1) {
        const x = right - offset;
        if (isFunction[y][x]) continue;
        const bit = bitIndex < codewords.length * 8 ? (codewords[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1 : 0;
        bitIndex += 1;
        modules[y][x] = Boolean(bit ^ ((x + y) % 2 === 0 ? 1 : 0));
      }
    }
    upward = !upward;
  }

  const formatData = (0b01 << 3) | 0; // Error correction level L, mask pattern 0.
  let remainder = formatData << 10;
  for (let bit = 14; bit >= 10; bit -= 1) {
    if (((remainder >>> bit) & 1) !== 0) remainder ^= 0x537 << (bit - 10);
  }
  const formatBits = ((formatData << 10) | remainder) ^ 0x5412;
  const formatBit = (index: number) => ((formatBits >>> index) & 1) !== 0;
  for (let i = 0; i <= 5; i += 1) setFunction(8, i, formatBit(i));
  setFunction(8, 7, formatBit(6));
  setFunction(8, 8, formatBit(7));
  setFunction(7, 8, formatBit(8));
  for (let i = 9; i < 15; i += 1) setFunction(14 - i, 8, formatBit(i));
  for (let i = 0; i < 8; i += 1) setFunction(SIZE - 1 - i, 8, formatBit(i));
  for (let i = 8; i < 15; i += 1) setFunction(8, SIZE - 15 + i, formatBit(i));
  setFunction(8, SIZE - 8, true);

  return modules;
};
