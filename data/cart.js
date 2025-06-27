export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
];

export function addToCart(productId) {
  let repeatedItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      repeatedItem = item;
    }
  });

  if (repeatedItem) {
    repeatedItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  console.log(cart);
}
