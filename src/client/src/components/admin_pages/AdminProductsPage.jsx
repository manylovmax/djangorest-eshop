import React from "react";


export default function AdminProductsPage() {
    const products = [
        {id: 1, title: "Xiaomi Смартфон Redmi Note 13 8/256 ГБ, черный", description: "Достаточно тонкий, 7.97 мм толщиной, смартфон весит 188.5 г. Он удобно лежит в ладони, не скользит, функциями комфортно управлять одной рукой. Плоская рамка со скругленными углами вокруг и глубокий цвет задней крышки придают Xiaomi Redmi Note 13 премиальный внешний вид."},
        {id: 2, title: "Электроника", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quae doloribus error assumenda quam dignissimos esse rem eius voluptate nulla, minima, temporibus dolor quo, deleniti eos magnam iste accusamus sed!"},
    ]

    return (
        <>
            <h1>Продукты</h1>
            <a href="/admin/products/create" className="btn btn-success">Создать</a>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                { products.map((product, idx) => (
                    <tr>
                    <th scope="row">{product.id}</th>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td><a href={"/admin/products/update/" + product.id} className="btn btn-primary">Редактировать</a><div className="btn btn-danger">Удалить</div></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
