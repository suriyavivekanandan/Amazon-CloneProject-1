// import { cart,getCartQuantity} from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { GetDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../../utils/money.js";
import { addOrder } from "../../data/orders.js";
import { renderCheckoutHeader } from "./CheckoutHeader.js";
import { renderOrderSummary } from "./orderSummary.js";

export function renderPaymentSummary(){
  let productPricCents=0;
  let shippingPricecents=0;
  cart.cartItems.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);
    productPricCents+=product.priceCents*cartItem.quantity;
    const deliveryOption=GetDeliveryOption(cartItem.deliveryOptionId);
    shippingPricecents+=deliveryOption.priceCents
    
  });
  const totalCostBeforeTax=productPricCents+shippingPricecents;
  const taxCents=totalCostBeforeTax*0.1;
  const totalCents=totalCostBeforeTax+taxCents;
  let cartQunatity=cart.getCartQuantity();
 
      
       

  const PaymentSummaryHTML=` 
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQunatity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPricCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPricecents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCostBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
        </div>`
        document.querySelector('.js-payment-summary').innerHTML=PaymentSummaryHTML;
        
        try{
          document.querySelector('.js-place-order-button').
          addEventListener('click',async()=>{
            try{
              if (cart.cartItems.length === 0) {
                alert('Your cart is empty!');
                return;
            }
          } catch{
            console.log("unexcpeted error")
          };

          const response=await fetch('https://supersimplebackend.dev/orders',{
              method:'post',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                cart:cart
              })
            });
         const order=  await response.json();
            addOrder(order);
            document.querySelector('.js-order-summary').innerHTML=''
            cart.clearCart();
            renderOrderSummary();
            renderCheckoutHeader();
            window.location.href='orders.html';
          });
        }
          catch{
            console.log("unexcpeted error")
          };
        
          
}

