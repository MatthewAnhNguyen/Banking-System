export interface CardRequest {
  cardType: string;
}

export interface CardResponse {
  cardNumber: string;
  cardType: string;
  cardHolderName: string;
  expiryDate: string;
  status: string;
  message?: string;
}