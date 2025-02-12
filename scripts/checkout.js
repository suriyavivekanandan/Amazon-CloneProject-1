import{renderOrderSummary} from"./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/CheckoutHeader.js";
import {generateProductsFetch} from "../data/products.js";
import { generateCart } from "../data/cart-class.js";

async function loadPage(){
 try{
      // throw 'error1'
   await generateProductsFetch();
   const value= await new Promise((resolve,reject) => {
     generateCart(()=>{
        reject('error3');
         resolve('25');
         
     });   
 });
 console.log(value);
 }   
 catch{
    console.log('unkonow error occured')
 }

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
return 'value2'
};
loadPage().then((value)=>{
    console.log(value);
});




