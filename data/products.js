import { formatCurrency } from "../utils/money.js";
export function getProduct(productId){
  let matchingProduct='';
  products.forEach((product)=>{
  if(product.id === productId){
  matchingProduct=product;
  }
  });
  return matchingProduct;
}
class product{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
   constructor(productDetails){
this.id=productDetails.id
this.image=productDetails.image
this.name=productDetails.name
this.rating=productDetails.rating
this.priceCents=productDetails.priceCents
this.keywords=productDetails.keywords
   }
   getStarUrl(){
     return`images/ratings/rating-${this.rating.stars*10}.png`
   }
   getPrice(){
    return`$ ${formatCurrency(this.priceCents)}` 
   }
   extraInfo() {
    return ``;
  }

}
class Clothing extends product {
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfo() {
    return `<a href="${this.sizeChartLink}" target="_blank">sizeChart</a>`;
  }
}
class Appliances extends product{
  constructor(productDetails){
    super(productDetails);
    this.instructionsLink=productDetails.instructionsLink;
    this.warrantyLink=productDetails.warrantyLink;
  }
  extraInfo() {
    return `<a href="${this.instructionsLink}" target="_blank">Instructions</a>
            <a href="${this.warrantyLink}" target="_blank">warranty</a>`;
   
  }
  
}
export let products=[];
export function generateProductsFetch(){
 const promise= fetch('https://supersimplebackend.dev/products').then((response)=>{
   return response.json();
  }).then((productDetails)=>{
    products=productDetails.map((productDetails)=>{
      if(productDetails.type ==='clothing'){
        return new Clothing(productDetails);
      }
      if(productDetails.type ==='appliances'){
        return new Appliances(productDetails);
      }
     return new product(productDetails)
    });
    console.log('load products');
    //catch is used in promises to catch the error.
  }).catch((error)=>{
    console.log('unkonow error occured')
  })
  return promise;
};
/*generateProductsFetch().then(()=>{
  console.table('hello');
})*/

 export function generateProducts(fun){
    const xhr=new XMLHttpRequest();
    xhr.addEventListener('load',()=>{
      products=JSON.parse(xhr.response).map((productDetails)=>{
        if(productDetails.type ==='clothing'){
          return new Clothing(productDetails);
        }
        if(productDetails.type ==='appliances'){
          return new Appliances(productDetails);
        }
       return new product(productDetails)
      });
      
      fun();
    });
    //error handling in callback() value
    xhr.addEventListener('error',()=>{
      console.log('unkonow error occured')
    })

    xhr.open('GET','https://supersimplebackend.dev/products')
    xhr.send()
    
  }
  


 
