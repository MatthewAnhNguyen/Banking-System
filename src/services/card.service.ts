import api from "./api";
import type { CardRequest, CardResponse } from "../types/card";

export const requestCard = async (
  request: CardRequest
): Promise<CardResponse> => {
  const response = await api.post("/cards/request", request);
  return response.data;
};

export const getMyCards = async (): Promise<CardResponse[]> => {
  const response = await api.get("/cards/my-cards");
  return response.data;
};

export const blockCard = async (
  cardNumber: string
): Promise<CardResponse> => {
  const response = await api.put(`/cards/${cardNumber}/block`);
  return response.data;
};

export const unblockCard = async (
  cardNumber: string
): Promise<CardResponse> => {
  const response = await api.put(`/cards/${cardNumber}/unblock`);
  return response.data;
};