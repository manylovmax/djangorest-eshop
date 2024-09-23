import React from "react";

import ProductPhotos from "../ProductPhotos";
import ProductDescription from "../ProductDescription";
import ProductPrice from "../ProductPrice";
import ProductDetails from "../ProductDetails";
import TopBar from "../TopBar";


export default function ProductDetailPage() {
    const product = {
        title : "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный",
        description: "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный"
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <TopBar />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <ProductPhotos productId={1} />
                </div>
                <div className="col-4">
                    <ProductDescription product={product} />
                </div>
                <div className="col-2">
                    <ProductPrice productId={1} price={1000} />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <ProductDetails />
                </div>
            </div>
        </div>
    );
}
