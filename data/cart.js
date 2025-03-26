export const cart = [{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 1
},{
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 2
},{
  id: '54e0eccd-8f36-462b-b68a-8182611d9add',
  quantity: 3
}
];


let addedToCartSync =[];


export function addToCart(){
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
      updateCartQuantity();
      console.log(cart);
    });
  });
}

export function cartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity
  });
  return cartQuantity;
} 

export function updateCartQuantity(){
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity();
}




/*
class Cart{

  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  
  loadFromStorage(){
    this.cartItems  = JSON.parse(localStorage.getItem(this.#localStorageKey))
    if(!this.cartItems){
      this.cartItems = [{
        productId:'8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity:1,
        deliveryOptionId:'1'
      },{
        productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity:1,
        deliveryOptionId:'2'
      }];
    }
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId1){
    let matchingItem;
    this.cartItems.forEach((cartObject)=>{
      if(cartObject.productId === productId1){
        matchingItem = cartObject;
      }
    });
    if(matchingItem){
      matchingItem.quantity+=1;
    }
    else{
      this.cartItems.push({
        productId: `${productId1}`,
        quantity:1,
        deliveryOptionId:'1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId1){
    this.cartItems.forEach((cartObject,index)=>{
      if(cartObject.productId === productId1){
        this.cartItems.splice(index,1);
        this.saveToStorage();
      }
    });
  }

  updateDeliveryDate(productId1,deliveryId){
    let matchingElement;
    this.cartItems.forEach((cartObject)=>{
      if(cartObject.productId === productId1){
        matchingElement = cartObject;
      }
    });
    matchingElement.deliveryOptionId = deliveryId;
    this.saveToStorage();
  }
}
export const cart = new Cart('cart-oops');



export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    console.log(xhr.response);
    fun();
  }); 

  xhr.open('GET','https://supersimplebackend.dev/cart')
  xhr.send();
}
*/
