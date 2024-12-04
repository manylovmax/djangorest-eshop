import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import ProductPhotos from "../ProductPhotos";
import ProductDescription from "../ProductDescription";
import ProductPrice from "../ProductPrice";
import ProductDetails from "../ProductDetails";
import constants from "../../constants";


export default function ProductDetailPage() {

    const {productId} = useParams();
    const [product, setProduct] = useState({pathCategories: []});
    const [imagesUrls, setImagesUrls] = useState([]);
    const [attributeCategoriesWithAttributes, setAttributeCategoriesWithAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});

    useEffect(() => {
        let categoryId = null;
        axios.get(constants.SERVER_ADDRESS + "/api/get-product/" + productId).then(response => {
            setProduct(response.data);
            categoryId = response.data.category.id;
            let newImagesUrls = [];
            for (let i = 0; i < response.data.images.length; i++) {
                newImagesUrls.push(constants.SERVER_ADDRESS + response.data.images[i].file)
            }
            setImagesUrls(newImagesUrls);
        }).then(() => axios.get(constants.SERVER_ADDRESS + `/api/attribute-names-for-category/${categoryId}`).then(response => {
            setAttributeCategoriesWithAttributes(response.data);
        }));

        axios.get(constants.SERVER_ADDRESS + `/api/attribute-values-for-product/${productId}`).then(response => {
            if (response.data.length) {
                let newAttabuteValues = {};
                for (let i = 0; i < response.data.length; i++) {
                    let attribute = response.data[i];
                    newAttabuteValues[attribute["attributeNameId"]] = attribute["attributeValueValue"];
                }
                setAttributeValues(newAttabuteValues);
            }
        });

    }, []);

    function addToCart(productId) {

    }

    function copyProductLink() {
        navigator.clipboard.writeText(window.location.href);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="product-categories mb-3">
                        { product.pathCategories.map((category, idx) => (
                            <span key={idx}><Link to={"/category/" + category.id} >{category.title}</Link>{ idx != product.pathCategories.length -1 ? " / " : ""}</span>
                        ))}
                    </div>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-2">
                    {/* <div className="product-article">Артикул: {product.article} <span onClick={() => copyProductLink()} className="product-share-btn">Скопировать ссылку</span></div> */}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-5">
                    <ProductPhotos imagesUrls={imagesUrls} />
                </div>
                <div className="col-md-4 product-description">
                    <ProductDescription product={product} />
                </div>
                <div className="col-md-3">
                    <ProductPrice addToCart={() => addToCart(product.id)} price={product.price} />
                </div>
            </div>
            <ProductDetails product={product} attributeCategoriesWithAttributes={attributeCategoriesWithAttributes} attributeValues={attributeValues} />
        </>
    );
}
