import axiosInstance from "./axiosInstance";
import type { Notification } from "../types/Notification";

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

export const getUnreadCount = async (): Promise<number> => {
  const response = await axiosInstance.get("/notifications/unread-count");
  return response.data.count;
};

export const markAsRead = async (id: number) => {
  await axiosInstance.put(`/notifications/${id}/read`);
};

export const markAllAsRead = async () => {
  await axiosInstance.put("/notifications/read-all");
};