import {products} from "./products.js";
export let cart = [{
  productId:'8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
  quantity:1
},{
  productId:'3ebe75dc-64d2-4137-8860-1f5a963e534b',
  quantity:1
}];

export function addToCart(addToCartElement){
  let matchingItem;
    cart.forEach((cartObject)=>{
      if(cartObject.id === addToCartElement.dataset.productId){
        matchingItem = cartObject;
      }
    });
    if(matchingItem){
      matchingItem.quantity+=1;
    }
    else{
      cart.push({
        id: addToCartElement.dataset.productId,
        quantity:1
      });
    }
}
export function removeFromCart(productId){
  cart.forEach((cartObject,index)=>{
    if(cartObject.productId === productId){
      cart.splice(index,1);
    }
  });
}