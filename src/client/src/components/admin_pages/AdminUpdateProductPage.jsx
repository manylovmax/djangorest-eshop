import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import constants from "../../constants";


export default function AdminUpdateProductPage () {
    const navigate = useNavigate();
    const {productId} = useParams();

    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [productTitle, setProductTitle] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [formErrors, setFormErrors] = useState([]);
    const [attributeCategoriesWithAttributes, setAttributeCategoriesWithAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    const [oldAttributeValues, setOldAttributeValues] = useState({});
    const [attributeNameIdVsAttributeValueId, setAttributeNameIdVsAttributeValueId] = useState({});
    const [images, setImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    

    useEffect(() => {
        axios.get(constants.SERVER_ADDRESS + `/api/admin/product/${productId}/`).then(response => {
            setProductTitle(response.data?.title);
            setProductDescription(response.data?.description);
            setProductPrice(response.data?.price);
            setSelectedCategoryId(response.data?.category);
            const categoryId = response.data?.category;
            axios.get(constants.SERVER_ADDRESS + "/api/admin/assignable-categories/").then(response => {
                setCategories(response.data);
                setSelectedCategory(response.data.filter(category => category.id == categoryId)[0]);
            }).then(() => axios.get(constants.SERVER_ADDRESS + `/api/admin/attribute-names-for-category/${categoryId}/`).then(response => {
                setAttributeCategoriesWithAttributes(response.data);
            }))
            
            axios.get(constants.SERVER_ADDRESS + `/api/admin/attribute-values-for-product/${productId}/`).then(response => {
                if (response.data.length) {
                    let newAttabuteValues = {};
                    let newAttributeNameIdVsAttributeValueId = {};
                    for (let i = 0; i < response.data.length; i++) {
                        let attribute = response.data[i];
                        newAttabuteValues[attribute["attributeNameId"]] = attribute["attributeValueValue"];
                        newAttributeNameIdVsAttributeValueId[attribute["attributeNameId"]] = attribute["attributeValueId"];
                    }
                    setAttributeValues(newAttabuteValues);
                    setOldAttributeValues(newAttabuteValues);
                    setAttributeNameIdVsAttributeValueId(newAttributeNameIdVsAttributeValueId);
                }
            });


            
            axios.get(constants.SERVER_ADDRESS + `/api/admin/images-for-product/${productId}/`).then(response => {
                if (response.data.length) {
                    let newImages = [];
                    for(let i = 0; i < response.data.length; i++) {
                        newImages[i] = {
                            url: constants.SERVER_ADDRESS + response.data[i].file,
                            id: response.data[i].id,
                            file: null
                        }
                    }
                    setImages(newImages);
                }
            });
        })
    }, [])

    function setAttributeValue(id, value) {
        let newAttributeValues = {...attributeValues};
        newAttributeValues[id] = value;
        setAttributeValues(newAttributeValues);
    }

    function updateProduct() {
        axios.put(`${constants.SERVER_ADDRESS}/api/admin/product/${productId}/`, {
            title: productTitle,
            description: productDescription,
            price: productPrice
        }).then(response => {
            let attributeValuesToUpdate = {}, attributeValuesToCreate = {}, attributeValuesToDelete = [];
            for(let i = 0; i < attributeCategoriesWithAttributes.length; i++) {
                for(let j = 0; j < attributeCategoriesWithAttributes[i].attributeNames.length; j++) {
                    const attributeNameId = attributeCategoriesWithAttributes[i].attributeNames[j].attributeNameId;
                    if (attributeNameIdVsAttributeValueId.hasOwnProperty(attributeNameId) && attributeValues[attributeNameId] != oldAttributeValues[attributeNameId] && attributeValues[attributeNameId] != "") {
                        // collect attribute values to update
                        attributeValuesToUpdate[attributeNameIdVsAttributeValueId[attributeNameId]] = attributeValues[attributeNameId];
                    } else if (attributeValues.hasOwnProperty(attributeNameId) && !attributeNameIdVsAttributeValueId.hasOwnProperty(attributeNameId)) {
                        // collect attribute values to create
                        attributeValuesToCreate[attributeNameId] = attributeValues[attributeNameId];
                    } else if (attributeNameIdVsAttributeValueId.hasOwnProperty(attributeNameId) && attributeValues[attributeNameId] == "") {
                        // collect attribute values to delete
                        attributeValuesToDelete.push(attributeNameIdVsAttributeValueId[attributeNameId])
                    }
                }
            }
            // bulk create attribute values
            if (Object.keys(attributeValuesToCreate).length)
                axios.post(constants.SERVER_ADDRESS + "/api/admin/create-attribute-values-for-product/", {
                    productId,
                    "attributeNameIdVsAttributeValue": attributeValuesToCreate
                });
            // bulk update attribute values
            if (Object.keys(attributeValuesToUpdate).length)
                axios.post(constants.SERVER_ADDRESS + "/api/admin/update-attribute-values/", {
                    "attributeValueIdVsAttributeValue": attributeValuesToUpdate
                });
            // bulk delete attribute values
            if (attributeValuesToDelete.length)
                axios.post(constants.SERVER_ADDRESS + "/api/admin/delete-attribute-values/", {
                    "attributeValueIdList": attributeValuesToDelete
                });

            // delete removed images
            if (imagesToDelete.length)
                axios.post(constants.SERVER_ADDRESS + "/api/admin/delete-images/", {
                    "imagesIdList": imagesToDelete
                });

            // create added images
            let newImages = [];
            for (let i = 0; i < images.length; i++) {
                if (images[i]?.id)
                    continue
                else
                    newImages.push(images[i])
            }
            if (newImages.length){
                let data = {productId};
                for (let i = 0; i < newImages.length; i++)
                    data['image_' + i] = newImages[i].file;
                axios.post(constants.SERVER_ADDRESS + "/api/admin/create-images-for-product/", data, {headers: {'Content-Type': 'multipart/form-data'}});
            }
            
            navigate("/admin/products");
        });
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
    useEffect(() => validate(), [productTitle, productDescription, productPrice])

    function addEmptyImage() {
        let newImages = [...images];
        newImages.push({url: null, id: null, file: null});
        setImages(newImages);
    }

    function setSelectedImage(file, index) {
        let newImages = [...images];
        newImages[index].file = file;
        newImages[index].url = URL.createObjectURL(file);
        setImages(newImages);
    }

    function removeImage(index) {
        let newImages = [...images], newImagesToDelete = [...imagesToDelete];
        if (images[index]?.id) {
            newImagesToDelete.push(images[index].id);
            setImagesToDelete(newImagesToDelete);
        }
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return (
        <>
            <h1>Обновить продукт</h1>
            <div className="mb-3"><span>Категория: {selectedCategory?.title} (ID: {selectedCategoryId ? selectedCategoryId : ""}; путь: {selectedCategory ? selectedCategory.path : ""})</span>
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
            
            <div className="row">
            {images.map((image, idx) => (
                <div className="mb-3 p-3 card col-md-4" key={idx}>
                    <img className="img-fluid mb-3" src={image.url} alt="" />
                    {image.id ? "" : <input type="file" onChange={e => setSelectedImage(e.target.files[0], idx)}/>}
                    <button className="btn btn-danger" onClick={e => removeImage(idx)}>Удалить</button>
                </div>
            ))}
            </div>
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
                <button className="btn btn-success"  disabled={ formErrors.length ? true : false} onClick={updateProduct}>Обновить</button>
            </div>
        </>                
    );
}
