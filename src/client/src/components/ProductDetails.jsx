import React from "react";


export default function ProductDetails(props) {

    const product = {
        // https://www.ozon.ru/product/xiaomi-smartfon-redmi-note-13-8-256-gb-chernyy-1405138161/?from_sku=1405138161&oos_search=false
        title : "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный",
        description: "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный"
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    Описание
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    Комплектация
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    Характеристики
                </div>
            </div>
        </>
    );
}
