import {renderCheckoutPage} from '../checkout/orderSummery.js';
import {renderPaymentDetails} from '../checkout/paymentSummery.js';
import {loadProducts,loadProductsFetch, products} from '../data/products.js';
import {loadCart} from '../data/cart.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';


/*
async function loadPage(){
  try{

    await loadProductsFetch();
    await new Promise((resolve,reject)=>{

      loadCart(()=>{
        resolve();
      });
    });
  }
  catch{
    console.log("Unexpected Error.\nPlease try again 😊");
  }

  cart_items_number_fun();
  renderCheckoutPage();
  renderPaymentDetails();  

}
loadPage().then(()=>{console.log('Displayed')});
*/


/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
    resolve();
    });
  })
]).then(()=>{
  renderCheckoutPage();
  renderPaymentDetails();
});
*/




loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutPage();
    renderPaymentDetails();  
  })
});
