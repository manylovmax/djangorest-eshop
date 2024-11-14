import React, {useState, useEffect} from "react";
import axios from "axios";

import constants from "../constants";


export default function MenuCategoriesButton() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    useEffect(() => {
        axios.get(constants.SERVER_ADDRESS + "/products/get-categories-tree/").then(response => {
            setCategories(response.data);
            setSubCategories(response.data[0].subcategories);
        }
        )
    }, []);

    function handleShowSubcategories(categoryId) {
        const newSubCategories = categories.filter(c => c.id == categoryId)[0]?.subcategories;
        setSubCategories(newSubCategories);
    }

    return (
        <>
            <div onClick={() => setMenuVisible(!menuVisible)} className="menu-categories-button btn btn-primary">Каталог</div>
            <div className={"menu-categories-content " + (menuVisible ? "" : "d-none")}>
                <div className="menu-categories-content_categories first-level-category">
                { categories.map((category, idx) => (
                    <div key={idx} onMouseOver={() => handleShowSubcategories(category.id)} onClick={() => showSubcategories(categoy.id)}>{category.title}</div>
                ))}
                </div>
                <div className="menu-categories-content_subcategories">
                    { subcategories.map((subcategory, idx) => (
                        <div key={idx} className="second-level-category">{subcategory.title}
                        { subcategory.subcategories.map((subsubcategory, idx) => (
                            <div key={idx} className="third-level-category">{subsubcategory.title}</div>
                        ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}