import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import constants from "../../constants";


export default function AdminUpdateCategoryPage () {
    const navigate = useNavigate();

    const [parentCategoryId, setParentCategoryId] = useState("");
    const [parentCategory, setParentCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryAssignable, setCategoryAssignable] = useState(false);

    const {categoryId} = useParams();

    useEffect(() => {
        axios.get(constants.SERVER_ADDRESS + "/api/admin/all-categories/").then(response => {
            setCategories(response.data);
        });
        axios.get(`${constants.SERVER_ADDRESS}/api/admin/product-category/${categoryId}/`).then(response => {
            setCategoryAssignable(response.data?.assignable);
            setCategoryTitle(response.data?.title);
            if (response.data.parent) {
                setParentCategoryId(response.data?.parent);
                axios.get(`${constants.SERVER_ADDRESS}/api/admin/product-category/${response.data.parent}/`).then(response => setParentCategory(response.data));
            }
        })
    }, [])

    function updateCategory() {
        axios.put(`${constants.SERVER_ADDRESS}/api/admin/product-category/${categoryId}/`, {
            title: categoryTitle,
            parent: parentCategoryId ? parentCategoryId : null,
            assignable: categoryAssignable
        }).then(response => navigate("/admin/categories"));
    }

    function setParentCategoryHandler(id) {
        const idNumber = Number(id);
        setParentCategoryId(idNumber);
        let category = null;
        if (idNumber)
            category = categories.filter(category => category.id == idNumber)[0];
        setParentCategory(category);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Создать категорию</h1>
                    <div className="mb-3">Родительская категория:
                        <select className="form-select" onChange={(e) => setParentCategoryHandler(e.target.value)} name="parent_category" value={parentCategoryId} >
                            <option value="0">Нет</option>
                            {categories.map((category, idx) => (
                                <option key={idx} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                        <span>ID: {parentCategoryId ? parentCategoryId : ""} </span><span>Путь: {parentCategory ? parentCategory.path : ""}</span></div>
                    <div className="mb-3">
                        <label htmlFor="category-name">Название категории:</label>
                        <input className="form-control" onInput={(e) => setCategoryTitle(e.target.value)} id="category-name" name="category-name" type="text" value={categoryTitle}/>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input name="assignable" className="form-check-input"
                         type="checkbox" id="assignable" onChange={(e) => setCategoryAssignable(e.target.checked)} checked={categoryAssignable}/>
                        <label className="form-check-label" htmlFor="assignable">Назначаемая</label>
                      </div>
                    </div>
                    <button className="btn btn-primary" onClick={updateCategory}>Обновить</button>
                </div>
            </div>
        </div>
    );
}
