import React from "react";


export default function AdminCategoriesPage() {
    const categories = [
        {id: 1, title: "Электроника", path: "/1/"},
        {id: 2, title: "Одежда", path: "/2/"},
    ]

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Категории продуктов</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Путь</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                        { categories.map((category, idx) => (
                            <tr>
                            <th scope="row">{category.id}</th>
                            <td>{category.title}</td>
                            <td>{category.path}</td>
                            <td><div className="btn btn-primary">Редактировать</div><div className="btn btn-danger">Удалить</div></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
