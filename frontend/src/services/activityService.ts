import axios from "axios";
import type { ActivityLog } from "../types/activity";

const API_URL = "http://localhost:8080/api/activity";

export const getActivities = async (): Promise<ActivityLog[]> => {
  const token = localStorage.getItem("jwtToken");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};