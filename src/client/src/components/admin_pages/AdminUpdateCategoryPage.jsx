import React, {useState} from "react";


export default function AdminCreateCategoryPage() {
    const categories = [
        {id: 1, title: "Электроника", path: "/1/"},
        {id: 2, title: "Одежда", path: "/2/"},
    ];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    function onChange(event) {
        let selected = categories.filter(category => category.id == event.target.value);
        setSelectedCategory(selected[0]);
    }
    function updateCategory() {

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Редактировать категорию продуктов</h1>
                    <div className="mb-3"><label htmlFor="parent_category">Родительская категория:</label>
                        <select className="form-select" onChange={onChange} name="parent_category" value={selectedCategory? selectedCategory.id : 0} >
                            <option value="0">Нет</option>
                            {categories.map((category, idx) => (
                                <option key={idx} value={category.id}>{category.title}</option>
                            ))}
                        </select>
                        <span>ID: {selectedCategory ? selectedCategory.id: ""} </span><span>path: {selectedCategory ? selectedCategory.path: ""}</span></div>
                    <div className="mb-3">
                        <label htmlFor="category-name">Название категории:</label>
                        <input className="form-control" onInput={(e) => setCategoryName(e.target.value)} id="category-name" name="category-name" type="text" value={categoryName}/>
                    </div>
                    <button className="btn btn-primary" onClick={updateCategory}>Сохранить</button>
                    <a className="btn btn-link" href="/admin/categories/" >Отмена</a>
                </div>
            </div>
        </div>
    );
}
