// import { calculateCartQuantity,addToCart } from "../data/cart.js";
import { cart } from "../data/cart-class.js";
import { products,generateProductsFetch } from "../data/products.js";
generateProductsFetch().then(renderProductsGrid)
function renderProductsGrid(){

let productHTML = ''
const url =new URL(window.location.href);
const search=url.searchParams.get('suriya')
let filterProducts =products;
if (search) {
    filterProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

filterProducts.forEach((product)=>{
  productHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src=${product.getStarUrl()}>
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
      <div class="product-price">
      ${product.getPrice()}
      </div>
      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      ${product.extraInfo()}
      <div class="product-spacer"></div>
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png"> Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;


});
document.querySelector('.js-products-grid').innerHTML += productHTML;
function updateCartQuantity(){
  const cartQunatity=cart.calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML=cartQunatity;
 
}
updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
          button.addEventListener('click',()=>{
            const productId=button.dataset.productId;
            const quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
           cart.addToCart(productId,quantity);
            updateCartQuantity();
          
          
      const addedToCart=document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCart.classList.add('added-to-cart-visible');
      setTimeout(()=>{
        addedToCart.classList.remove('added-to-cart-visible')
      },2000)

          });
      });
    

    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `index.html?suriya=${search}`;
    });
  }

 
   
 
