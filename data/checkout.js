import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrencey} from '../utils/money.js';
let matchingItem;
let cartHtml='';

cart.forEach((cartObject)=>{
  
  let productId = cartObject.productId;
  products.forEach((productObject)=>{
    if(productId === productObject.id){
      matchingItem = productObject;
    }
    
  });
  updateCart(matchingItem,cartObject);
});

function updateCart(matchingItem,cartObject){
  
  cartHtml += `<div class="cart-item-container">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-price">
          $${formatCurrencey(matchingItem.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartObject.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary
          js-delete-button"
          data-delete-button-id=${matchingItem.id}
          >
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelector('.js-order-summary').innerHTML = cartHtml;
}


document.querySelectorAll('.js-delete-button').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.deleteButtonId;
      console.log(productId);
      removeFromCart(productId);
      console.log(cart);
  });
});