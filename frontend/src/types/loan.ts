export interface Loan {
  loanNumber: string;
  loanType: string;
  loanAmount: number;
  interestRate: number;
  tenureMonths: number;
  emiAmount: number;
  status: string;
  message?: string;
}