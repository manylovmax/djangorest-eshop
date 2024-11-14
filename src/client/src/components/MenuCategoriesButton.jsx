import React, {useState, useEffect} from "react";
import axios from "axios";

import constants from "../constants";


export default function MenuCategoriesButton() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);

    useEffect(() => {
        axios.get(constants.SERVER_ADDRESS + "/products/get-categories-tree/").then(response => {
            setCategories(response.data);
            setActiveCategory(response.data[0]?.id);
            setSubCategories(response.data[0]?.subcategories);
        });
    }, []);

    function handleShowSubcategories(categoryId) {
        const newSubCategories = categories.filter(c => c.id == categoryId)[0]?.subcategories;
        setSubCategories(newSubCategories);
        setActiveCategory(categoryId);
    }

    return (
        <>
            <div onClick={() => setMenuVisible(!menuVisible)} className="menu-categories-button btn btn-primary">Каталог</div>
            <div className={"menu-categories-content " + (menuVisible ? "" : "d-none")}>
                <div className="menu-categories-content_categories">
                { categories.map((category, idx) => (
                    <div className={"first-level-category " + (category.id == activeCategory ? "active" : "")} key={idx} 
                    onMouseOver={() => handleShowSubcategories(category.id)} 
                    onClick={() => handleShowSubcategories(category.id)}
                    >
                        {category.title}
                    </div>
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