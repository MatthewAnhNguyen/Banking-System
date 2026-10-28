import api from "./api";
import type { Profile } from "../types/profile";

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get<Profile>("/profile");
  return response.data;
};

export const updateProfile = async (
  data: {
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  }
): Promise<Profile> => {
  const response = await api.put<Profile>("/profile", data);
  return response.data;
};