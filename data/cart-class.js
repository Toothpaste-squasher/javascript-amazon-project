class Cart {
  #cartItems; // Private property to hold cart items
  #localStorageKey; // Private property for localStorage key

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!this.cartItems) {
      this.cartItems = [];
    }
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let repeatedItem;
    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        repeatedItem = item;
      }
    });

    if (repeatedItem) {
      repeatedItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "standard", // Default delivery option
      });
    }

    this.saveToLocalStorage();
  }

  removeFromCart(productId) {
    const new Cart = [];

    cart.forEach((cartItem) => {
      if (productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    this.saveToLocalStorage();
  }

  updateItemQuantity(productId) {
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
}

const cartOop = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

