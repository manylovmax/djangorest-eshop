import React from "react";
import { Link } from "react-router-dom";

import ProductPhotos from "../ProductPhotos";
import ProductDescription from "../ProductDescription";
import ProductPrice from "../ProductPrice";
import ProductDetails from "../ProductDetails";
import TopBar from "../TopBar";


export default function ProductDetailPage() {
    const product = {
        id: 1,
        title : "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный",
        description: "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный",
        rating: 4.9,
        reviews_count: 123,
        questions_count: 321,
        brand: "Xiaomi",
        color: "черный",
        article: 1234567890,
        categories_path: "/1/2/3/4/"
    }

    function addToCart(productId) {

    }

    function copyProductLink() {
        navigator.clipboard.writeText(window.location.href);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <TopBar />
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <div className="product-categories">
                        <Link>Электроника</Link> / 
                        <Link>Телефоны и смарт-часы</Link> / 
                        <Link>Смартфоны</Link> / 
                        <Link>Xiaomi</Link>
                    </div>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-3">
                    <div className="product-article">Артикул: {product.article} <span onClick={() => copyProductLink()} className="product-share-btn">Скопировать ссылку</span></div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ProductPhotos productId={1} />
                </div>
                <div className="col-md-4 product-description">
                    <ProductDescription product={product} />
                </div>
                <div className="col-md-3">
                    <ProductPrice addToCart={() => addToCart(product.id)} price={19363} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <ProductDetails />
                </div>
            </div>
        </div>
    );
}
