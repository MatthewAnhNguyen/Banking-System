export interface Beneficiary {
  id: number;
  beneficiaryName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  nickname: string;
  verified: boolean;
  message?: string;
}