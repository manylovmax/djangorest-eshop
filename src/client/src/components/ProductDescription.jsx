import React from "react";


export default function ProductDescription(props) {
    return (
        <>
            <div className="row">
                <h1>{ props.product.title }</h1>
            </div>
            <div className="row">
                Рейтинг {props.product.rating} {props.product.reviews_count} отзывов | {props.product.questions_count} вопросов
            </div>
            <div className="row">
                Бренд: {props.product.brand}
            </div>
            <div className="row">
                Цвет: {props.product.color}
            </div>
            <div className="row">
                Встроенная память
            </div>
            <div className="row">
                О товаре, ссылка к описанию
            </div>
            <div className="row">
                Основные 5 тегов-характеристик
            </div>
        </>
    );
}
