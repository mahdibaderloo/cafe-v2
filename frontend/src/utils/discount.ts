export function calculateDiscountedPrice(
  totalPrice: number,
  discountType: "PERCENTAGE" | "FIXED_AMOUNT" | null,
  discountValue: number,
) {
  if (!discountType || discountValue <= 0) {
    return totalPrice;
  }

  if (discountType === "PERCENTAGE") {
    return Math.max(0, totalPrice - (totalPrice * discountValue) / 100);
  }

  return Math.max(0, totalPrice - discountValue);
}
