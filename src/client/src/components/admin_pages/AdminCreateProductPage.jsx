import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import constants from "../../constants";


export default function AdminCreateProductPage () {
    const navigate = useNavigate();

    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [productTitle, setProductTitle] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [formErrors, setFormErrors] = useState([]);
    

    useEffect(() => {
        axios.get(constants.SERVER_ADDRESS + "/products/assignable-categories/").then(response => {
            setCategories(response.data);
            setSelectedCategory(response.data[0]);
            setSelectedCategoryId(response.data[0]?.id);
        });
    }, [])

    function createProduct() {
        axios.post(constants.SERVER_ADDRESS + "/products/product/", {
            title: productTitle,
            description: productDescription,
            price: productPrice,
            category: selectedCategoryId,
            
        }).then(response => {
            navigate("/admin/products");
        });
    }


    function setCategoryHandler(id) {
        const idNumber = Number(id);
        setSelectedCategoryId(idNumber);
        let category = null;
        if (idNumber)
            category = categories.filter(category => category.id == idNumber)[0];
        setSelectedCategory(category);
    }


    function validate() {
        let newFormErrors = [];
        if (!productTitle.length) {
            newFormErrors.push({attribute: "productTitle", value: "Необходимо ввести значение"})
        }
        if (!productDescription.length) {
            newFormErrors.push({attribute: "productDescription", value: "Необходимо ввести значение"})
        }
        if (!productPrice.length) {
            newFormErrors.push({attribute: "productPrice", value: "Необходимо ввести значение"})
        }
        setFormErrors(newFormErrors);
    }
    useEffect(() => validate(), [productTitle, productDescription, productPrice])

    return (
        <>
            <h1>Зарегистрировать продукт</h1>
            <div className="mb-3">Категория:
                <select className="form-select" onChange={(e) => setCategoryHandler(e.target.value)} name="category" value={selectedCategoryId} >
                    {categories.map((category, idx) => (
                        <option key={idx} value={category.id}>{category.title}</option>
                    ))}
                </select>
                <span>ID: {selectedCategoryId ? selectedCategoryId : ""} </span><span>Путь: {selectedCategory ? selectedCategory.path : ""}</span>
            </div>

            <div className="mb-3">
                <label htmlFor="inputTitle" className="form-label">Название</label>
                <input type="text" className={"form-control " + (formErrors.filter(item => item.attribute == "productTitle").length ? "is-invalid" : "is-valid") }
                 id="inputTitle" value={productTitle} onInput={e => setProductTitle(e.target.value)}/>
                <div class="invalid-feedback">
                    {formErrors.filter(item => item.attribute == "productTitle").map((item, key) => (
                    <div key={key}>{item.value}</div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="inputPrice" className="form-label">Стоимость</label>
                <input type="number" className={"form-control " + (formErrors.filter(item => item.attribute == "productPrice").length ? "is-invalid" : "is-valid") }
                 id="inputPrice"  value={productPrice} onInput={e => setProductPrice(e.target.value)}/>
                <div class="invalid-feedback">
                    {formErrors.filter(item => item.attribute == "productPrice").map((item, key) => (
                    <div key={key}>{item.value}</div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="textareaDescription" className="form-label">Описание</label>
                <textarea className={"form-control " + (formErrors.filter(item => item.attribute == "productDescription").length ? "is-invalid" : "is-valid") }
                 id="textareaDescription" rows="3" value={productDescription} onInput={e => setProductDescription(e.target.value)}></textarea>
                <div class="invalid-feedback">
                    {formErrors.filter(item => item.attribute == "productDescription").map((item, key) => (
                    <div key={key}>{item.value}</div>
                    ))}
                </div>
            </div>

            <div>
                <button className="btn btn-success"  disabled={ formErrors.length ? true : false} onClick={createProduct}>Зарегистрировать</button>
            </div>
        </>                
    );
}
