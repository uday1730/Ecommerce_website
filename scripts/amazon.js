import {cart} from '../data/cart.js';

import {products/*, Clothing, loadProducts*/} from '../data/products.js';

let productHTML = '';

//loadProducts(renderProductsGrid);

function renderProductsGrid(){
  products.forEach((product)=>{
    productHTML+=`
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="././images/ratings/rating-${(product.rating.stars*10)}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents/100).toFixed(2)}
        </div>
        <div class="product-quant-size js-product-quant-size">
          <div class="product-quantity-container js-product-quantity-container" data-product-id="${product.id}">
            <select>
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
          ${getSizeChartLink(product)}
        </div>

        ${
          //product instanceof Clothing ? product.getSizeChartLink() : '' 
          ''       
        }
      

        <div class="added-to-cart js-added-to-cart" data-product-id="${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}"
        >
          Add to Cart
        </button>
      </div>
    `;
  });
  document.querySelector('.js-products-grid').innerHTML = productHTML;


  


  let cartQuantity = 0;

  function updateCartQuantity(){
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
  updateCartQuantity();

  let addedToCartSync =[];
  document.querySelectorAll('.js-add-to-cart').forEach((element)=>{
    
    element.addEventListener('click',()=>{
      let itemId = element.dataset.productId;
      let incrementValue = 0;
      document.querySelectorAll('.js-added-to-cart').forEach((addedToCartItem)=>{
        if(addedToCartItem.dataset.productId === itemId){
          addedToCartSync.forEach((syncItem)=>{
            syncItem.addedToCartItem.classList.remove('added-to-cart-clicked');
            if(syncItem.addedToCartTimeoutId) clearTimeout(syncItem.addedToCartTimeoutId);
            addedToCartSync.splice(0,1);
          });
          
          setTimeout(()=>{
            addedToCartItem.classList.add('added-to-cart-clicked');
          }, 100);
          let addedToCartTimeoutId = setTimeout(()=>{
            addedToCartItem.classList.remove('added-to-cart-clicked');
          }, 2000);
          addedToCartSync.push({
            addedToCartItem,
            addedToCartTimeoutId
          });
        }
      });

      document.querySelectorAll('.js-product-quantity-container').forEach((quantityItem)=>{
        if (quantityItem.dataset.productId === itemId) {
          incrementValue = Number(quantityItem.querySelector('select').value);
        }        
      });

      let existing = false;
      cart.forEach((cartItem)=>{
        if(cartItem.id === itemId){
          cartItem.quantity += incrementValue;
          existing = true;
        }
      });
      if (!existing){
        cart.push({
          id: element.dataset.productId,
          quantity: incrementValue
        });
      }
      cartQuantity += incrementValue;
      updateCartQuantity();
    });
  });

  
}

renderProductsGrid();

function getSizeChartLink(product){
  if (product.sizeChartLink){
    const chartsize = `<div class="product-spacer">
          <a href="${product.sizeChartLink}">Size</a>
        </div>`;
    return chartsize;
  }
  return '';
}

