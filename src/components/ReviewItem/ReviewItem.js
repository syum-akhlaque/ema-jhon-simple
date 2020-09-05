import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, img, key, price} = props.product;
    const reviewItem = {
        border :' 1px solid #eee',
        padding: '45px',
        margin: '10px 50px'    
    }
    return (
        <div style={reviewItem} >
            <img width = 'auto' height = '150px' src={img} alt=""/>
            <h4 className = 'product-name'> {name}</h4>
            <p> Quantity : {quantity}</p>
            <p><small>Price : {price}</small></p>
            <button  className = 'btn' onClick = {() => props.removeProduct(key)} >Remove</button>
        </div>
    );
};

export default ReviewItem;