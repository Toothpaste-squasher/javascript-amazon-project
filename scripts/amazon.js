import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";


loadProducts(renderProductsGrid)

function renderProductsGrid() {
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img
            class="product-image"
            src="${product.image}"
          />
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            class="product-rating-stars"
            src="${product.getStarsUrl()}"
          />
          <div class="product-rating-count link-primary">${
            product.rating.count
          }</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
          <select>
            ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
          product.id
        }">Add to Cart</button>
      </div>
    `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;


  function updateCartQuantity() {
    let cartSize = 0;
    cart.forEach((cartItem) => {
      cartSize += cartItem.quantity;
    });
    document.querySelector(".cart-quantity").innerHTML = cartSize;
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();
      console.log(cart);
    });
  });
}