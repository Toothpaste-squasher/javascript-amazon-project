export const cart = [];

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
