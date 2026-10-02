import { ApiError } from "../types/ApiError";

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.validationErrors) {
      const firstError = Object.values(error.validationErrors)[0];
      if (firstError) return firstError;
    }

    if (error.message) return error.message;

    return "خطای ناشناخته‌ای رخ داد";
  }

  if (error instanceof TypeError) {
    return "اتصال به سرور برقرار نشد";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "خطای ناشناخته‌ای رخ داد";
}
