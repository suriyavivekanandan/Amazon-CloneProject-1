import { getOrder } from "../data/orders.js";
import { generateProductsFetch, getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from "../data/cart-class.js";

async function loadPage() {
  await generateProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  if (!order || !product) {
    console.error("Order or product not found");
    return;
  }

  const productDetails = order.products.find(details => details.productId === product.id);
  if (!productDetails) {
    console.error("Product details not found in order");
    return;
  }

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress = ((today.diff(orderTime)) / (deliveryTime.diff(orderTime))) * 100;

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${productDetails.quantity}</div>
    <img class="product-image" src="${product.image}" alt="Product Image">

    <div class="progress-labels-container">
      <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">Preparing</div>
      <div class="progress-label ${percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''}">Shipped</div>
      <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${Math.min(percentProgress, 100)}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  document.querySelector('.js-cart-quantity').innerHTML = cart.getCartQuantity();
}

loadPage();
