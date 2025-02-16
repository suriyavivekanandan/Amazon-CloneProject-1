import { getProduct, generateProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from '../utils/money.js';
import { cart } from "../data/cart-class.js";
try {
  await loadpage();
} catch (error) {
  console.error('Error loading page:', error);
  document.querySelector('.js-orders-grid').innerHTML = `
      <div class="error-message">
          Sorry, there was an error loading your orders. Please try again later.
      </div>
  `;
}


async function loadpage() {
    await generateProductsFetch();
    
    let ordersHTML = '';

    // Process each order
    for (const order of orders) {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');
        const productsHTML = await productsListHTML(order); // Wait for products HTML

        ordersHTML += `
        <div class="orders-grid">
            <div class="order-container">
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderTimeString}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>

                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>

              <div class="order-details-grid">
                ${productsHTML}
              </div> 
            </div>
        </div>`;
    }

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
    document.querySelectorAll('.js-buy-again-button').forEach(button => {
      button.addEventListener('click', () => {
          cart.addToCart(button.dataset.productId,1);
          button.innerHTML=`Added`
          setTimeout(()=>{
            button.innerHTML=`
             <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
            `;
            StoredStorage();

          },1000);
        
      });
  });
}


async function productsListHTML(order) {
    let productsListHTML = '';


    for (const productDetails of order.products) {
        try {
            const product = getProduct(productDetails.productId);
            

            productsListHTML += `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-delivery-date">
                    Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
                </div>
                <div class="product-quantity">Quantity: ${productDetails.quantity}</div>
                <button class="buy-again-button button-primary js-buy-again-button" 
                        data-product-id="${product.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>
            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                    <button class="track-package-button button-secondary">Track package</button>
                </a>
            </div>`;
        } catch (error) {
            console.error('Error processing product:', error);
        }
    }

    return productsListHTML;
  }


  function StoredStorage(){
    document.querySelector('.cart-quantity').innerHTML=cart.getCartQuantity();
  }
StoredStorage();
