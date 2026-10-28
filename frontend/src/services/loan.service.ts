import api from "./api";

import type { Loan } from "../types/loan";
import type { LoanRequest } from "../types/loanRequest";

export const getMyLoans = async (): Promise<Loan[]> => {
  const response = await api.get("/loans/my-loans");
  return response.data;
};

export const applyLoan = async (
  data: LoanRequest
) => {
  return api.post("/loans/apply", data);
};

export const getLoan = async (
  loanNumber: string
): Promise<Loan> => {
  const response = await api.get(`/loans/${loanNumber}`);
  return response.data;
};