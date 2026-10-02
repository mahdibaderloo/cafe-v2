export interface ErrorResponse {
  success: false;
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
  validationErrors?: Record<string, string>;
}
