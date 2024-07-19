export const cart = [];

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