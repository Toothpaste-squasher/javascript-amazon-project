export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}

export function saveToLocalStorage() {
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
      deliveryOptionId: "standard", // Default delivery option
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

export function updateItemQuantity(productId) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      const quantityDisplay = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      const quantityInputBox = `
        <input type="number" class="js-quantity-input" value="${cartItem.quantity}"/>
      `;
      quantityDisplay.innerHTML = quantityInputBox;
      document
        .querySelector(".js-quantity-input")
        .addEventListener("change", (event) => {
          const newQuantity = parseInt(
            document.querySelector(".js-quantity-input").value
          );
          console.log(typeof newQuantity);
          if (newQuantity >= 1 && Number.isInteger(newQuantity) === true) {
            cartItem.quantity = newQuantity;
            saveToLocalStorage();
          } else {
            alert("Please enter a valid quantity.");
          }
        });

      document
        .querySelector(".js-quantity-input")
        .addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            const newQuantity = parseInt(
              document.querySelector(".js-quantity-input").value
            );
            if (newQuantity >= 1 && Number.isInteger(newQuantity) === true) {
              cartItem.quantity = newQuantity;
              saveToLocalStorage();
            } else {
              alert("Please enter a valid quantity.");
            }
            quantityDisplay.innerHTML = cartItem.quantity;
          }
        });
    }
  });
}
