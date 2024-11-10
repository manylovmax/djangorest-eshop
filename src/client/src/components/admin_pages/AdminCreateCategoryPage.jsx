import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import constants from "../../constants";


export default function AdminCreateCategoryPage () {
    const navigate = useNavigate();

    const [parentCategoryId, setParentCategoryId] = useState("");
    const [parentCategory, setParentCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryAssignable, setCategoryAssignable] = useState(false);
    

    useEffect(() => {
        axios.get(constants.SERVER_ADDRESS + "/products/all-categories/").then(response => {
            setCategories(response.data);
        });
    }, [])

    function createCategory() {
        axios.post(constants.SERVER_ADDRESS + "/products/product-category/", {
            title: categoryTitle,
            parent: parentCategoryId ? parentCategoryId : null,
            assignable: categoryAssignable
        }).then(response => {
            navigate("/admin/categories");
        });
    }

    function setParentCategoryHandler(id) {
        setParentCategoryId(id);
        const category = categories.filter(category => category.id == id)[0];
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
                         type="checkbox" id="assignable" onChange={(e) => setCategoryAssignable(e.target.checked)} value={categoryAssignable}/>
                        <label className="form-check-label" htmlFor="assignable">Назначаемая</label>
                      </div>
                    </div>
                    <button className="btn btn-primary" onClick={createCategory}>Создать</button>
                </div>
            </div>
        </div>
    );
}
