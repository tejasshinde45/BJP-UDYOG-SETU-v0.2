import type { BusinessCardProfile } from '../types/businessCard';

export const BUSINESS_CARD_STORAGE_KEY = 'udyog_setu_business_card_v1';

export const readBusinessCard = (): BusinessCardProfile | null => {
  try {
    const value = localStorage.getItem(BUSINESS_CARD_STORAGE_KEY);
    if (!value) return null;
    const profile = JSON.parse(value) as BusinessCardProfile;
    if (!profile || typeof profile.businessName !== 'string') return null;
    return {
      ...profile,
      industrySector: profile.industrySector || '',
      businessDescription: profile.businessDescription || '',
      district: profile.district || '',
      industrialArea: profile.industrialArea || '',
      productsServices: profile.productsServices || '',
      rawMaterials: profile.rawMaterials || '',
      membershipStatus: profile.membershipStatus || 'not-provided',
      directoryVisible: Boolean(profile.directoryVisible),
      verificationStatus: 'not-verified',
    };
  } catch {
    return null;
  }
};

export const readSharedBusinessCard = (): BusinessCardProfile | null => {
  const match = window.location.hash.match(/^#profile=(.+)$/);
  if (!match) return null;
  try {
    const profile = JSON.parse(decodeURIComponent(match[1])) as Partial<BusinessCardProfile>;
    if (!profile || typeof profile.businessName !== 'string' || typeof profile.phone !== 'string') return null;
    return {
      businessName: profile.businessName,
      representative: profile.representative || '',
      businessCategory: profile.businessCategory || '',
      industrySector: profile.industrySector || '',
      businessDescription: profile.businessDescription || '',
      district: profile.district || '',
      industrialArea: profile.industrialArea || '',
      productsServices: profile.productsServices || '',
      rawMaterials: profile.rawMaterials || '',
      address: profile.address || '',
      phone: profile.phone,
      email: profile.email || '',
      membershipStatus: profile.membershipStatus || 'not-provided',
      directoryVisible: false,
      verificationStatus: 'not-verified',
    };
  } catch {
    return null;
  }
};

export const createBusinessCardShareUrl = (profile: BusinessCardProfile): string => {
  const { logoDataUrl: _logo, directoryVisible: _visibility, ...shareableProfile } = profile;
  return `${window.location.origin}${window.location.pathname}#profile=${encodeURIComponent(JSON.stringify(shareableProfile))}`;
};
