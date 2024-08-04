import {renderCheckoutPage} from './checkout/orderSummery.js';
import {renderPaymentDetails} from './checkout/paymentSummery.js';
import {loadProducts,loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
import '../data/cart-class.js';
//import '../data/backend-practice.js';

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

/*Using call-back which increases nesting of code
loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutPage();
    renderPaymentDetails();  
  })
});
*/