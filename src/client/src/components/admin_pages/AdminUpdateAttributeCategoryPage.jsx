import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import constants from "../../constants";


export default function AdminUpdateAttributeCategoryPage () {
    const navigate = useNavigate();
    const {Id} = useParams();

    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        let newCategories = [];
        axios.get(constants.SERVER_ADDRESS + "/products/assignable-categories/").then(response => {
            newCategories = response.data;
            setCategories(newCategories);
        });
        axios.get(constants.SERVER_ADDRESS + `/products/attribute-category/${Id}/`).then(response => {
            setTitle(response.data?.title);
            setCategoryId(response.data?.category);
            setCategory(newCategories.filter(c => c.id == response.data.category)[0])
        });
    }, [])

    function updateAttributeCategory() {
        axios.put(constants.SERVER_ADDRESS + `/products/attribute-category/${Id}/`, {
            id: Id,
            title,
            category: categoryId
        }).then(response => {
            navigate("/admin/attribute-categories");
        });
    }

    function validate() {
        let newFormErrors = [];
        if (!title.length) {
            newFormErrors.push({attribute: "title", value: "Необходимо ввести значение"})
        }
        setFormErrors(newFormErrors);
    }

    useEffect(() => validate(), [title])

    function setCategoryIdHandler(id) {
        const idNumber = Number(id);
        setCategoryId(idNumber);
        const newCategory = categories.filter(c => c.id == idNumber)[0];
        setCategory(newCategory);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Создать категорию атрибутов</h1>
                    <div className="mb-3">Категория продуктов:
                        <select className="form-select" onChange={(e) => setCategoryIdHandler(e.target.value)} id="category-select" name="category" value={categoryId} >
                            {categories.map((category, idx) => (
                                <option key={idx} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                        <span>ID: {categoryId} </span><span>Путь: {category?.path}</span></div>
                    <div className="mb-3">
                        <label htmlFor="category-name">Название категории:</label>
                        <input className={"form-control " + (formErrors.filter(item => item.attribute == "title").length ? "is-invalid" : "is-valid") }
                               onInput={(e) => setTitle(e.target.value)} id="category-name" name="category-name" type="text" value={title}/>
                       <div className="invalid-feedback">
                         {formErrors.filter(item => item.attribute == "title").map((item, key) => (
                           <div key={key}>{item.value}</div>
                         ))}
                       </div>
                    </div>
                    
                    <button className="btn btn-primary" disabled={ formErrors.length ? true : false} onClick={updateAttributeCategory}>Обновить</button>
                </div>
            </div>
        </div>
    );
}
