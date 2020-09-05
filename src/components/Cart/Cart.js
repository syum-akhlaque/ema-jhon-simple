import React from 'react';
import { Link } from 'react-router-dom';
const Cart = (props) => {
    const cart = props.cart;
    console.log('added',cart);

    // const total = cart.reduce((total, product) => total + product.price, 0); 
    let total = 0;
    for(let i = 0; i < cart.length; i++){
        const product = cart[i];
        // console.log("hare is"+product);
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if(total > 100){
        shipping = 0;
    }else if(total > 50){
        shipping = 30;
    }else if(total != 0){
        shipping = 40;
    }
    let tax = total / 10;
    return (
        <div>
            <h4>Order summary</h4>
            <p>Items Order: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p><small>Shipping: {shipping}</small></p>
            <p><small>Tax+VAT: {Number(tax).toFixed(2)}</small></p>
            <p>Total Price: {Number(total+shipping+tax).toFixed(2)}</p>
            {
                props.children
            }
            
        </div>
    );
};


export default Cart;
// const Cart = (props) => {
//     const cart = props.cart;
//     console.log(cart);
//     const total = cart.reduce((total, product) => total + product.price, 0);
//     return (
//         <div>
//             <h4>order summary</h4>
//             <p>item ordered: {cart.length}</p>
//             <p>total price: {total}</p>
//         </div>
//     );
// };
