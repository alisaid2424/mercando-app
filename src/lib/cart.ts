import { FlexibleCartItem } from "@/types/product";

export const deliveryFee = 10;

export const getSubTotal = (items: FlexibleCartItem[]) => {
  return items.reduce((total, item) => {
    const quantity = item?.quantity || 0;
    const price = item.product?.offerPrice ?? 0;
    return total + price * quantity;
  }, 0);
};

export const getTotalAmount = (items: FlexibleCartItem[]) => {
  return getSubTotal(items) + deliveryFee;
};
