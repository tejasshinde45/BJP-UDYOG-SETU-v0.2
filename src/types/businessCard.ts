export type MembershipStatus = 'self-reported-member' | 'not-a-member' | 'not-provided';

export interface BusinessCardProfile {
  businessName: string;
  logoDataUrl?: string;
  representative: string;
  businessCategory: string;
  industrySector: string;
  businessDescription: string;
  district: string;
  industrialArea: string;
  productsServices: string;
  rawMaterials: string;
  address: string;
  phone: string;
  email: string;
  membershipStatus: MembershipStatus;
  directoryVisible: boolean;
  verificationStatus: 'not-verified';
}
