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
    const [attributeCategoriesWithAttributes, setAttributeCategoriesWithAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    const [images, setImages] = useState([{url: "", file: null}]);
    

    useEffect(() => {
        axios.get(constants.SERVER_ADDRESS + "/api/admin/assignable-categories/").then(response => {
            setCategories(response.data);
            setSelectedCategory(response.data[0]);
            setSelectedCategoryId(response.data[0]?.id);
            
            if (response.data.length)
                axios.get(constants.SERVER_ADDRESS + `/api/admin/attribute-names-for-category/${response.data[0]?.id}/`).then(response => {
                    setAttributeCategoriesWithAttributes(response.data);
                });
        });
    }, [])

    function setAttributeValue(id, value) {
        let newAttributeValues = {...attributeValues};
        newAttributeValues[id] = value;
        setAttributeValues(newAttributeValues);
    }

    function createProduct() {
        axios.post(constants.SERVER_ADDRESS + "/api/admin/product/", {
            title: productTitle,
            description: productDescription,
            price: productPrice,
            category: selectedCategoryId,
            
        }).then(response => {
            if (Object.keys(attributeValues).length)
                axios.post(constants.SERVER_ADDRESS + "/api/admin/create-attribute-values-for-product/", {
                    productId: response.data?.id,
                    attributeNameIdVsAttributeValue: attributeValues
                });
            let data = {productId: response.data?.id};
            for (let i = 0; i < images.length; i++)
                data['image_' + i] = images[i].file;
            axios.post(constants.SERVER_ADDRESS + "/api/admin/create-images-for-product/", data, {headers: {'Content-Type': 'multipart/form-data'}});
        }).then(result => navigate("/admin/products"));
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
        if (!productTitle) {
            newFormErrors.push({attribute: "productTitle", value: "Необходимо ввести значение"})
        }
        if (!productDescription) {
            newFormErrors.push({attribute: "productDescription", value: "Необходимо ввести значение"})
        }
        if (!productPrice) {
            newFormErrors.push({attribute: "productPrice", value: "Необходимо ввести значение"})
        }
        setFormErrors(newFormErrors);
    }
    useEffect(() => validate(), [productTitle, productDescription, productPrice]);

    function addEmptyImage() {
        let newImages = [...images];
        newImages.push({url: "", file: null});
        setImages(newImages);
    }

    function setSelectedImage(file, index) {
        let newImages = [...images];
        newImages[index].file = file;
        newImages[index].url = URL.createObjectURL(file);
        setImages(newImages);
    }

    function removeImage(index) {
        let newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

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
                <div className="invalid-feedback">
                    {formErrors.filter(item => item.attribute == "productTitle").map((item, key) => (
                    <div key={key}>{item.value}</div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="inputPrice" className="form-label">Стоимость</label>
                <input type="number" className={"form-control " + (formErrors.filter(item => item.attribute == "productPrice").length ? "is-invalid" : "is-valid") }
                 id="inputPrice"  value={productPrice} onInput={e => setProductPrice(e.target.value)}/>
                <div className="invalid-feedback">
                    {formErrors.filter(item => item.attribute == "productPrice").map((item, key) => (
                    <div key={key}>{item.value}</div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="textareaDescription" className="form-label">Описание</label>
                <textarea className={"form-control " + (formErrors.filter(item => item.attribute == "productDescription").length ? "is-invalid" : "is-valid") }
                 id="textareaDescription" rows="3" value={productDescription} onInput={e => setProductDescription(e.target.value)}></textarea>
                <div className="invalid-feedback">
                    {formErrors.filter(item => item.attribute == "productDescription").map((item, key) => (
                    <div key={key}>{item.value}</div>
                    ))}
                </div>
            </div>


            {images.map((image, idx) => (
                <div className="mb-3 p-3 card" key={idx}>
                    <img className="img-fluid mb-3" src={image.url} alt="" />
                    <input type="file" onChange={e => setSelectedImage(e.target.files[0], idx)}/>
                    <button className="btn btn-danger" onClick={e => removeImage(idx)}>Удалить</button>
                </div>
            ))}
            <button onClick={addEmptyImage} className="btn btn-success">Добавить изображение</button>


            {attributeCategoriesWithAttributes.map((category, key) => (
                <div className="mb-3 card p-3" key={key}>
                    <h5>{category.attributeCategoryTitle}</h5>
                    {category.attributeNames.map((attributeName, idx) => (
                        <div className="mb-3" key={attributeName.attributeNameId}>
                            <label htmlFor={"attributeName" + attributeName.attributeNameId} className="form-label">{attributeName.attributeNameTitle}</label>
                            <input type="text" className="form-control" id={"attributeName" + attributeName.attributeNameId} value={attributeValues.hasOwnProperty(attributeName.attributeNameId) ? attributeValues[attributeName.attributeNameId]: ""} onInput={e => setAttributeValue(attributeName.attributeNameId, e.target.value)}/>
                        </div>
                    ))}
                </div>

            ))}

            <div>
                <button className="btn btn-success"  disabled={ formErrors.length ? true : false} onClick={createProduct}>Зарегистрировать</button>
            </div>
        </>                
    );
}
