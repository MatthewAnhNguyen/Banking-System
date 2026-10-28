import api from "./api";
import type { AnalyticsResponse } from "../types/analytics";

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await api.get<AnalyticsResponse>(
    "/dashboard/analytics"
  );

  return response.data;
};