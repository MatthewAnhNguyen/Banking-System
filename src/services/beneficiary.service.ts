import api from "./api";

import type { Beneficiary } from "../types/beneficiary";
import type { BeneficiaryRequest } from "../types/beneficiaryRequest";

export const getBeneficiaries = async (): Promise<Beneficiary[]> => {
  const response = await api.get("/beneficiaries");
  return response.data;
};

export const addBeneficiary = async (
  data: BeneficiaryRequest
) => {
  return api.post("/beneficiaries", data);
};

export const updateBeneficiary = async (
  id: number,
  data: BeneficiaryRequest
) => {
  return api.put(`/beneficiaries/${id}`, data);
};

export const deleteBeneficiary = async (
  id: number
) => {
  return api.delete(`/beneficiaries/${id}`);
};