export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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

  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToLocalStorage();
}
