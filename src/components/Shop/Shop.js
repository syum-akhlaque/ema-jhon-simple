import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Shop = () => {
    const firsrTen = fakeData.slice(0,10)
    const [products ,setProduct] = useState(firsrTen);
    const [cart,setCart] = useState([]);

    useEffect(()=>{

      const saveCart = getDatabaseCart();
      const productKeys = Object.keys(saveCart);
      const previousCart = productKeys.map(existingKey =>{
          const product = fakeData.find( pd => pd.key === existingKey);
          product.quantity = saveCart[existingKey];
          
          return product;
        })
      console.log(previousCart);
      setCart(previousCart);
    },[])

    const handleAddProduct = (product) =>{
      let count =1;
      let newCart;
      const sameProduct = cart.find(pd => pd.key === product.key);
      if(sameProduct){
         // console.log( sameProduct.quantity )
          count = sameProduct.quantity+1;
          sameProduct.quantity = count;
          const others = cart.filter(pd => pd.key !== product.key);
          newCart = [...others,sameProduct]
         
      }
      else{
          product.quantity =1;
          newCart = [...cart,product]; 
      }
      setCart(newCart);

      addToDatabaseCart(product.key,count)
    }
    return (
        <div className='shop-container'>
          <div className="product-container">
                {
                  products.map( pd => 
                    <Product 
                    key= {pd.key}
                    handleAddProduct={handleAddProduct} 
                    product={pd} showAddToCart={true}
                    ></Product>
                )
                }
          </div>
          <div className="cart-container">
            <Cart cart ={cart}>
              <Link to='/review'>
              <button className = 'btn' >Review Order</button>
              </Link>
            </Cart>
            
            
          </div>
            
        </div>
           
    );
};
export default Shop;