import React from "react";


export default function ProductDescription(props) {

    const product = {
        // https://www.ozon.ru/product/xiaomi-smartfon-redmi-note-13-8-256-gb-chernyy-1405138161/?from_sku=1405138161&oos_search=false
        title : "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный",
        description: "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный"
    }
    return (
        <>
            <div className="row">
                Название
            </div>
            <div className="row">
                Рейтинг, отзывы, вопросы
            </div>
            <div className="row">
                Бренд
            </div>
            <div className="row">
                Цвет
            </div>
            <div className="row">
                Встроенная память
            </div>
            <div className="row">
                О товаре, ссылка к описанию
            </div>
            <div className="row">
                Основные теги
            </div>
        </>
    );
}
