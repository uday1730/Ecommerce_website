import { cart } from "./data/cart.js";
document.querySelector('.testing').innerHTML = `${cart.cartItems}`;
console.log(cart.cartItems);
