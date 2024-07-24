import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrencey} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from './deliveryOptions.js';


let matchingItem;
let cartHtml='';


cart.forEach((cartObject)=>{
  
  let productId = cartObject.id;
  products.forEach((productObject)=>{
    if(productId === productObject.id){
      matchingItem = productObject;
    }
    
  });


  const deliveryOptionId = cartObject.deliveryOptionId;
  let deliveryObject;
  deliveryOptions.forEach((deliveryOptionsObject)=>{
    if(deliveryOptionId === deliveryOptionsObject.id){
      deliveryObject = deliveryOptionsObject;
    }
  });
  
  const deliveryDate = dayjs().add(deliveryObject.deliveryDays,'days').format('dddd, MMMM D');

  updateCart(matchingItem,cartObject,deliveryDate);

});


function updateCart(matchingItem,cartObject,deliveryDate){
  
  cartHtml += `<div class="cart-item-container js-cart-element-${matchingItem.id}">
  <div class="delivery-date js-delivery-date">
    Delivery date: ${deliveryDate}
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
        ${displayDeliveryDate(matchingItem,cartObject)}
      </div>
    </div>
  </div>`;

  document.querySelector('.js-order-summary').innerHTML = cartHtml;
}


function displayDeliveryDate(matchingItem,cartObject){
  let deliveryOptionsHTML = '';
  deliveryOptions.forEach((deliveryOption)=>{

    const deliveryString = deliveryOption.priceCents>0 ? formatCurrencey(deliveryOption.priceCents) : 'FREE';

    const isChecked  = (deliveryOption.id === cartObject.deliveryOptionId) ;


    deliveryOptionsHTML +=`
      <div class="delivery-option">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date js-best-delivery-date">
            ${dayjs().add(deliveryOption.deliveryDays,'days').format('dddd, MMMM D')}
          </div>
          <div class="delivery-option-price">
            $${!deliveryString ? `FREE` : deliveryString} - Shipping
          </div>
        </div>
      </div>

    `
  });

  return (deliveryOptionsHTML);
}


document.querySelectorAll('.js-delete-button').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.deleteButtonId;
      console.log(productId);
      
      removeFromCart(productId);

      document.querySelector(`.js-cart-element-${productId}`).remove();

      console.log(cart);
  });
});

