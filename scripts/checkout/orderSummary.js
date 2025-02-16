// import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../../utils/money.js";
import { deliveryOptions, GetDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./CheckoutHeader.js";

// Render order summary without reattaching event listeners after every render
export function renderOrderSummary() {
  let summaryHTML = '';
  
  cart.cartItems.forEach(cartItem => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = GetDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);

    summaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">Update</span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${generateDeliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = summaryHTML;
  setupEventListeners();
}

function generateDeliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach(deliveryOption => {
    const dateString = calculateDeliveryDate(deliveryOption);
    const priceString = deliveryOption.priceCents === 0 ? 'Free-shipping' : `$${formatCurrency(deliveryOption.priceCents)}-shipping`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString}</div>
        </div>
      </div>`;
  });

  return html;
}

function setupEventListeners() {
  document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
    link.onclick = () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
    };
  });

  document.querySelectorAll('.js-update-quantity-link').forEach(link => {
    link.onclick = () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    };
  });

  document.querySelectorAll('.js-save-quantity-link').forEach(link => {
    link.onclick = () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      if (newQuantity <= 0 || newQuantity >= 1000) {
        alert("Enter a valid quantity");
      } else {
       cart.updateQuantity(productId, newQuantity);
        renderPaymentSummary();
        renderOrderSummary();
      }
    };
  });

  document.querySelectorAll('.js-delivery-option').forEach(option => {
    option.onclick = () => {
      const { productId, deliveryOptionId } = option.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    };
  });
  if (cart.cartItems.length === 0) {
    document.querySelector('.js-order-summary').innerHTML = `
      <div data-testid="empty-cart-message">
          Your cart is empty.
      </div>
      <a class="button-primary view-products-link " href="." data-testid="view-products-link">
          View products
      </a>
    `;
  }
  
}

renderOrderSummary();
