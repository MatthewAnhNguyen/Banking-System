import api from "./api";
import type { ChangePasswordRequest } from "../types/settings";

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<string> => {
  const response = await api.put<string>(
    "/settings/change-password",
    data
  );

  return response.data;
};