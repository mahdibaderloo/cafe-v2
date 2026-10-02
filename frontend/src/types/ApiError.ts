import type { ErrorResponse } from "./error.type";

export class ApiError extends Error {
  status: number;
  errorCode: string;
  validationErrors?: Record<string, string>;

  constructor(response: ErrorResponse) {
    super(response.message);
    this.name = "ApiError";
    this.status = response.status;
    this.errorCode = response.error;
    this.validationErrors = response.validationErrors;
  }
}
