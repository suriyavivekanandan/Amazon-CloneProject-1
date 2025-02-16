import{renderOrderSummary} from"./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/CheckoutHeader.js";
import {generateProductsFetch} from "../data/products.js";
import { generateCart } from "../data/cart-class.js";

async function loadPage(){
 try{
     await Promise.all([
         generateProductsFetch(),
        generateCart()
     ]);
  
   
 }
 
 catch(error){
    console.log('unkonow error occured')
 }

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
}
loadPage();




