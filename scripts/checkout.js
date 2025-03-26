import{cart, cartQuantity, saveCartToLocalStorage} from "../data/cart.js";
import{products} from "../data/products.js";
import{formatCurrencey} from "../utils/money.js";


function updateHeaderCartQuantity(){
  document.querySelector('.js-header-cart-quantity').innerHTML = `${cartQuantity()} items`;
}
function emptyCart(){
  if(!cart.length){
    document.querySelector('.js-order-summary').innerHTML= "<div>Cart is empty</div>";
    return 1
  }
}


function renderCheckoutPage(){
  if(emptyCart()) return
  let checkoutHTML = "";
  cart.forEach((cartItem)=>{
    let productObject;

    products.forEach((productObj)=>{
      if(cartItem.id === productObj.id){
        productObject = productObj;
      }
    });

    checkoutHTML += `
      
      <div class="cart-item-container js-cart-item-container-${productObject.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="../${productObject.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${productObject.name}
              </div>
              <div class="product-price">
                $${formatCurrencey(productObject.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productObject.id}">
                  Update
                </span>
                <input class="quantity-input css-update-input js-update-input js-update-input-${productObject.id} off-update-supplies"
                data-product-id=${productObject.id}>
                <span class="save-quantity-link js-update-save js-update-save-${productObject.id} off-update-supplies"
                data-product-id=${productObject.id}>Save</span>
                <span class="delete-quantity-link link-primary js-delete-button" data-product-id=${productObject.id}>
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
                  name="delivery-option-${productObject.id}">
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
                  name="delivery-option-${productObject.id}">
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
                  name="delivery-option-${productObject.id}">
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
        </div>
        
      `;
  });


  document.querySelector('.js-order-summary').innerHTML= checkoutHTML;
  updateHeaderCartQuantity();
  
  // Code for DELETING item from cart
  document.querySelectorAll('.js-delete-button').forEach((deleteElement)=>{
    deleteElement.addEventListener('click',()=>{
      console.log(deleteElement.dataset.productId);
      cart.forEach((cartItem, index)=>{
        if (deleteElement.dataset.productId === cartItem.id) {
          cart.splice(index,1);
        }
      });

      if(emptyCart()){
        console.log("Cart is empty");
        
      }
      else{
        let removeElement = document.querySelector(`.js-cart-item-container-${deleteElement.dataset.productId}`);
        removeElement.remove();
      }
      updateHeaderCartQuantity();
      saveCartToLocalStorage();
      
    });
  });

  //Code for UPDATING item in cart
  document.querySelectorAll('.js-update-quantity-link').forEach((updateItem)=>{
    updateItem.addEventListener('click',()=>{
      console.log(updateItem.dataset.productId);
      document.querySelector(`.js-update-input-${updateItem.dataset.productId}`).classList.toggle("off-update-supplies");
      document.querySelector(`.js-update-save-${updateItem.dataset.productId}`).classList.toggle("off-update-supplies");
    });
  });

  //Code for Update INPUT for Eventlistener
  document.querySelectorAll('.js-update-input').forEach((updateInputItem)=>{
    updateInputItem.addEventListener('keydown',(event)=>{
      if(event.key === "Enter"){
        document.querySelector(`.js-update-save-${updateInputItem.dataset.productId}`).click();
      }
    })
  });

  //Code of Update SAVE item in cart
  document.querySelectorAll('.js-update-save').forEach((saveElement)=>{
    saveElement.addEventListener('click',()=>{
      let valueElement = document.querySelector(`.js-update-input-${saveElement.dataset.productId}`);
      console.log(saveElement.dataset.productId);
      cart.forEach((cartItem)=>{
        if(cartItem.id === saveElement.dataset.productId) cartItem.quantity = Number(valueElement.value);
      });
      
      renderCheckoutPage();
      saveCartToLocalStorage();
    });
  });

}

renderCheckoutPage();


