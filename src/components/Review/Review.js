import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart,removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

const Review = () => {
    const [cart,setCart]= useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false)

    const removeProduct = (productKey) =>{
        console.log("clicked "+productKey);
        const newCart = cart.filter( pd => pd.key != productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);  
    }
    const handlePlaceOrder = ()=>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
        
    }
    let thanks;
    if (orderPlaced){
        thanks = 'Thanks for Ur Order'
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart() ;
        const productKeys = Object.keys(saveCart);
        //const productValues = Object.values(saveCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;        
        });
        // console.log(saveCart);
        // console.log(productKeys);
        // console.log(cartProduct);
        setCart(cartProduct);
    
    },[])
    return (
        <div className = 'shop-container'>  
            <div className = 'product-container'>
                {
                    cart.map(pd => <ReviewItem 
                        product = {pd} 
                        key = {pd.key}
                        removeProduct = {removeProduct}
                    ></ReviewItem>)
                }
                <h2>{thanks}</h2>  
            </div>
            <div className = 'cart-container'>
                <Cart cart ={cart}>
                    <Link to='/review'>
                        <button className = 'btn' onClick = {handlePlaceOrder}>Place Order</button>
                    </Link>
                </Cart>
                
            </div>
        </div>
    );
};

export default Review;