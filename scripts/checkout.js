import {renderCheckoutPage} from './checkout/orderSummery.js';
import {renderPaymentDetails} from './checkout/paymentSummery.js';
import { loadProducts } from '../data/products.js';
import '../data/cart-class.js';
import '../data/backend-practice.js';

loadProducts(()=>{
  renderCheckoutPage();
  renderPaymentDetails();
});
