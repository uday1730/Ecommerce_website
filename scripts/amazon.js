import {cart, addToCart, updateCartQuantity} from '../data/cart.js';

import {formatCurrencey} from"../utils/money.js";

import {products/*, Clothing, loadProducts*/} from '../data/products.js';

let productHTML = '';


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
          $${formatCurrencey(product.priceCents)}
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

  addToCart();

  updateCartQuantity();  
    
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

