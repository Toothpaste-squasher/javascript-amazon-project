import { cart, saveToLocalStorage } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [
  {
    id: "standard",
    description: "Delivered within 5-7 business days.",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "express",
    description: "Delivered within 2-3 business days.",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "next-day",
    description: "Delivered the next business day.",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function genArrivalDateString(deliveryOptionId) {
  const today = dayjs();
  const deliveryOption = deliveryOptions.find(
    (option) => option.id === deliveryOptionId
  );
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}

export function updateDeliveryOptions(optionPicked, cartItem) {
  if (optionPicked.value === deliveryOptions[0].id) {
    cartItem.deliveryOptionId = optionPicked.value;
  } else if (optionPicked.value === deliveryOptions[1].id) {
    cartItem.deliveryOptionId = optionPicked.value;
  } else if (optionPicked.value === deliveryOptions[2].id) {
    cartItem.deliveryOptionId = optionPicked.value;
  }
  saveToLocalStorage();
  console.log(JSON.parse(localStorage.getItem("cart")));
}
