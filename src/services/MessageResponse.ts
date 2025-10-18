
export interface MessageResponse{
  message: string;
  id ?: number;
}

export interface MessageResponseWithStatus{
  message: string;
  id ?: number;
  status: number;
}
