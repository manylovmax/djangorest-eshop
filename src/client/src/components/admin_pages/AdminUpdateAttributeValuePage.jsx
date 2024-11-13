import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import constants from "../../constants";


export default function AdminUpdateAttributeValuePage () {
    const navigate = useNavigate();
    const {Id} = useParams();

    const [attributeValue, setAttributeValue] = useState({});
    const [attributeName, setAttributeName] = useState({});
    const [value, setValue] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        let model = null;
        axios.get(constants.SERVER_ADDRESS + `/products/attribute-value/${Id}/`).then(response => {
            model = response.data;
            setValue(response.data?.value);
            setAttributeValue(response.data);
        }).then(() => axios.get(constants.SERVER_ADDRESS + `/products/attribute-name/${model.attribute_name}`).then(response => {
            setAttributeName(response.data);
        }))
    }, [])

    function updateAttributeValue() {
        axios.put(constants.SERVER_ADDRESS + `/products/attribute-value/${Id}/`, {
            id: Id,
            value,
            product: attributeValue.product
        }).then(response => {
            navigate("/admin/attributes-values");
        });
    }

    function validate() {
        let newFormErrors = [];
        if (!value.length) {
            newFormErrors.push({attribute: "value", value: "Необходимо ввести значение"})
        }
        setFormErrors(newFormErrors);
    }
    useEffect(() => validate(), [value])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Редактировать имя атрибута</h1>
                    <div className="mb-3">ID продукта: {attributeValue.product}</div>
                    <div className="mb-3">Название атрибута: {attributeName.title}</div>
                    <div className="mb-3">
                        <label htmlFor="category-name">Значение атрибута:</label>
                        <input className={"form-control " + (formErrors.filter(item => item.attribute == "value").length ? "is-invalid" : "is-valid") }
                               onInput={(e) => setValue(e.target.value)} id="category-name" name="category-name" type="text" value={value}/>
                       <div className="invalid-feedback">
                         {formErrors.filter(item => item.attribute == "value").map((item, key) => (
                           <div key={key}>{item.value}</div>
                         ))}
                       </div>
                    </div>
                    
                    <button className="btn btn-primary" disabled={ formErrors.length ? true : false} onClick={updateAttributeValue}>Обновить</button>
                </div>
            </div>
        </div>
    );
}
