import React from "react";


export default function ProductDescription({product}) {
    return (
        <>
            <div className="row">
                <h1>{ product.title }</h1>
            </div>
            {/* <div className="row">
                Рейтинг {product.rating} {product.reviews_count} отзывов | {product.questions_count} вопросов
            </div> */}
            {/* <div className="row">
                Бренд: {product.brand}
            </div> */}
            {/* <div className="row">
                Цвет: {product.color}
            </div> */}
            {/* <div className="row">
                Встроенная память
            </div> */}
            {/* <div className="row">
                О товаре, ссылка к описанию
            </div> */}
            {/* <div className="row">
                Основные 5 тегов-характеристик
            </div> */}
        </>
    );
}
