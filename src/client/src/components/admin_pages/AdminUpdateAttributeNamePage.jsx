import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import constants from "../../constants";


export default function AdminUpdateAttributeNamePage () {
    const navigate = useNavigate();
    const {Id} = useParams();

    const [attributeCategoryId, setAttributeCategoryId] = useState("");
    const [attributeCategories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        let newCategories = [];
        axios.get(constants.SERVER_ADDRESS + "/products/all-attribute-categories/").then(response => {
            newCategories = response.data;
            setCategories(newCategories);
        });
        axios.get(constants.SERVER_ADDRESS + `/products/attribute-name/${Id}/`).then(response => {
            setTitle(response.data?.title);
            setAttributeCategoryId(response.data?.attribute_category);
            setCategory(newCategories.filter(c => c.id == response.data.category)[0])
        });
    }, [])

    function updateAttributeName() {
        axios.put(constants.SERVER_ADDRESS + `/products/attribute-name/${Id}/`, {
            id: Id,
            title,
            attribute_category: attributeCategoryId
        }).then(response => {
            navigate("/admin/attribute-names");
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Редактировать имя атрибута</h1>
                    <div className="mb-3">Категория атрибута:
                        <select className="form-select" onChange={(e) => setAttributeCategoryId(e.target.value)} name="attribute-category" value={attributeCategoryId} >
                            {attributeCategories.map((category, idx) => (
                                <option key={idx} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                        <span>ID: {attributeCategoryId ? attributeCategoryId : ""}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category-name">Название атрибута:</label>
                        <input className={"form-control " + (formErrors.filter(item => item.attribute == "title").length ? "is-invalid" : "is-valid") }
                               onInput={(e) => setTitle(e.target.value)} id="category-name" name="category-name" type="text" value={title}/>
                       <div className="invalid-feedback">
                         {formErrors.filter(item => item.attribute == "title").map((item, key) => (
                           <div key={key}>{item.value}</div>
                         ))}
                       </div>
                    </div>
                    
                    <button className="btn btn-primary" disabled={ formErrors.length ? true : false} onClick={updateAttributeName}>Обновить</button>
                </div>
            </div>
        </div>
    );
}
