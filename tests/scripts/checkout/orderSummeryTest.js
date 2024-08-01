import { loadFromStorage,cart } from '../../../data/cart.js';
import {renderCheckoutPage} from '../../../scripts/checkout/orderSummery.js';
describe('test suite: renderCheckoutPage',()=>{
  const product1 = '8c9c52b5-5a19-4bcb-a5d1-158a74287c53';
  const product2 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';

  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        id:product1,
        quantity:1,
        deliveryOptionId:'1'
      },{
        id:product2,
        quantity:2,
        deliveryOptionId:'2'
      }]);
    });

    loadFromStorage();

    document.querySelector('.js-order-summery-test').innerHTML=`
    <div class='js-order-summary'></div>
    <div class='js-payment-summary'></div>
    `;

    renderCheckoutPage();
  });
  it('displaying order summery',()=>{
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-quantity-${product2}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-quantity-${product1}`).innerText
    ).toContain('Quantity: 1');
  });

  it('removes an element when delete button is clicked',()=>{

    document.querySelector(`.js-delete-button-${product1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-item-container-${product1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-item-container-${product2}`)
    ).not.toEqual(null);

    expect(cart[0].id).toEqual(product2);

    cart.forEach((cartObject)=>{
      expect(cartObject.id).not.toEqual(product1);
    });
  });
  afterEach(()=>{
    document.querySelector('.js-order-summery-test').innerHTML='';
  });
  afterAll(()=>{
    localStorage.clear();
  });
});