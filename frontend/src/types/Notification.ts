export interface Notification {
  id: number;
  title: string;
  message: string;
  notificationType: "EMAIL" | "SMS" | "PUSH";
  read: boolean;
  createdAt: string;
}