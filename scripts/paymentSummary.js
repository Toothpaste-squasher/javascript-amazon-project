import { cart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { products } from "../data/products.js";

export function itemsPrice() {
  let priceCentsSum = 0;
  cart.forEach((item) => {
    products.forEach((product) => {
      if (item.productId === product.id) {
        priceCentsSum += product.priceCents * item.quantity;
      }
    });
  });
  return priceCentsSum;
}

export function deliveryPrice() {
  let deliveryPriceCents = 0;
  let expressDelivery = false;
  let nextDayDelivery = false;
  cart.forEach((item) => {
    if (item.deliveryOptionId === "express" && !expressDelivery) {
      expressDelivery = true;
      deliveryPriceCents += 499;
    } else if (item.deliveryOptionId === "next-day" && !nextDayDelivery) {
      nextDayDelivery = true;
      deliveryPriceCents += 999;
    }
  });
  return deliveryPriceCents;
}

export function calculateTax() {
  const taxRate = 0.1; // 10% tax rate
  const totalCentsB4Tax = itemsPrice() + deliveryPrice();
  const taxCents = Math.round(totalCentsB4Tax * taxRate);
  return [taxCents, totalCentsB4Tax];
}

export function calculateTotalPrice() {
  const totalPrice = formatCurrency(calculateTax()[0] + calculateTax()[1]);

  return totalPrice;
}

export function cartSize() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}
