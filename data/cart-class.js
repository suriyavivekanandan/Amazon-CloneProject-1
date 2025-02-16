class Cart{
    cartItems=undefined;
    #localStoragekey=undefined;
    constructor(localStoragekey){
      this.#localStoragekey=localStoragekey;
      this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStoragekey));
        if(!this.cartItems){
              this.cartItems= [
                {
                  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                  quantity:3,
                  deliveryOptionId:'3'
                },
                {
                  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                  quantity:1,
                  deliveryOptionId:'2'
                }
              ]
        }
      }
      saveToStorage(){
        localStorage.setItem(this.#localStoragekey,JSON.stringify(this.cartItems));
     }
     addToCart(productId,quantity){
        let matchingcartItem;
        this.cartItems.forEach((cartItem)=>{
         if(productId === cartItem.productId){
             matchingcartItem=cartItem
         }
        });
        if(matchingcartItem){
         matchingcartItem.quantity+=quantity;
        }
        else{this.cartItems.push({
         productId:productId,
         quantity:quantity,
         deliveryOptionId:'1'
         
         });
        }
        this.saveToStorage();
       
        }
    removeFromCart(productId){
            const newCart=[]
              this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId !=productId){
                    newCart.push(cartItem)
                  }
              })
              this.cartItems=newCart;
              this.saveToStorage()
           }
           calculateCartQuantity(){
            return this. getCartQuantity();
           }
      updateQuantity(productId,newQuantity){
            let matchingItem;
              this.cartItems.forEach((cartItem)=>{
                if(productId === cartItem.productId){
                 matchingItem = cartItem;
                }
               
              })
              matchingItem.quantity=newQuantity;
              this.saveToStorage();
           }
       updateDeliveryOption(productId,deliveryOptionId){
            let matchingcartItem;
            this.cartItems.forEach((cartItem)=>{
              if(productId === cartItem.productId){
                  matchingcartItem=cartItem
              }
            });
            matchingcartItem.deliveryOptionId=deliveryOptionId
            this.saveToStorage();
          }
          getCartQuantity(){
            let cartQunatity=0;
            this.cartItems.forEach((item)=>{
            cartQunatity+=item.quantity;
            });
            return cartQunatity;
           
          }
          clearCart() {
            this.cartItems = [];
            localStorage.removeItem(this.#localStoragekey);
            this.saveToStorage();

          }
        
          
}

  export const cart=new Cart('cart-oop');


  export async function generateCart(fun){
    const response= await fetch('https://supersimplebackend.dev/cart');
    const text=await response.text();
  

  }
  
  
  
  
  
  
  
            
  
  
      
        
      
  