import { cart, removeFromCart, updateItemQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import {
  deliveryOptions,
  genArrivalDateString,
  updateDeliveryOptions,
} from "../data/deliveryOptions.js";
import * as paymentSum from "./paymentSummary.js";
import {loadProductsFetch} from "../data/products.js";

console.log("loaded")

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(resolve);
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

function loadCart(functionToCall) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    let cart = xhr.response;
    console.log(cart);
    functionToCall();
  });

  xhr.open("GET", "http://supersimplebackend.dev/cart", true);
  xhr.send();
}


// Display the total price of items in the cart
function renderPaymentSummary() {
  let orderSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${paymentSum.cartSize()}):</div>
      <div class="payment-summary-money">$${formatCurrency(
        paymentSum.itemsPrice()
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(
        paymentSum.deliveryPrice()
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
        paymentSum.calculateTax()[1]
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(
        paymentSum.calculateTax()[0]
      )}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${paymentSum.calculateTotalPrice()}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = orderSummaryHTML;
}

// Display the order summary
function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;

        cartSummaryHTML += `
          <div class="
            cart-item-container js-cart-item-containter-${matchingProduct.id}
          ">
            <div class="delivery-date" data-item-id='${productId}'>
              Delivery date: ${genArrivalDateString(cartItem.deliveryOptionId)}
            </div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: 
                    <span class="quantity-label js-quantity-label-${
                      matchingProduct.id
                    }">
                      ${cartItem.quantity}
                    </span> 
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(cartItem)}
              </div>
            </div>
          </div>
        `;
      }
    });
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  });


  function deliveryOptionsHTML(cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = genArrivalDateString(deliveryOption.id);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked =
        deliveryOption.id === cartItem.deliveryOptionId ? "checked" : "";

      html += `
        <div class="delivery-option">
          <input
            ${isChecked}
            type="radio"
            class="delivery-option-input js-delivery-option"
            value="${deliveryOption.id}"
            name="delivery-option-${cartItem.productId}"
          />
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} - Shipping</div>
          </div>
        </div>
      `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productToDelete = link.dataset.productId;
      removeFromCart(productToDelete);
      const container = document.querySelector(
        `.js-cart-item-containter-${productToDelete}`
      );
      container.remove();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      console.log("clicked");
      const productToUpdate = link.dataset.productId;
      updateItemQuantity(productToUpdate);
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("change", (event) => {
      if (event.target.checked) {
        cart.forEach((cartItem) => {
          if (event.target.name === `delivery-option-${cartItem.productId}`) {
            updateDeliveryOptions(event.target, cartItem);
            const deliveryDateString =
              document.querySelectorAll(".delivery-date");
            deliveryDateString.forEach((deliveryDate) => {
              if (
                "delivery-option-" + deliveryDate.dataset.itemId ===
                event.target.name
              ) {
                let dateString = "";
                cart.forEach((c) => {
                  if (c.productId === cartItem.productId) {
                    dateString = genArrivalDateString(c.deliveryOptionId);
                  }
                });
                deliveryDate.innerHTML = `Delivery date: ${dateString}`;
              }
            });
          }
        });
      }
    });
  });
}