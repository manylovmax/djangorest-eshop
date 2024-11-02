import React from "react";


export default function ProductPrice(props) {

    return (
        <>
            <div className="product-price">{props.price} ₽</div>
            <div><button onClick={() => props.addToCart()} className="product-cart-btn btn btn-lg btn-primary">Добавить в корзину</button></div>
        </>
    );
}
