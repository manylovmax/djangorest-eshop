import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import Paginator from "../admin_components/Paginatior";
import constants from "../../constants";


export default class AdminCategoriesPage extends React.Component {
    state = {
        categories: [],
        pageNumber: 1,
        hasPreviousPage: false,
        hasNextPage: true,
        pages: 1
    }

    componentDidMount() {
        this.getPage(1)
    }

    getPage(pageNumber) {
        axios.get(constants.SERVER_ADDRESS + "/products/product-category?page=" + pageNumber).then(response => {
            this.setState({
                categories: response.data?.results,
                pageNumber: response.data?.pageNumber,
                hasPreviousPage: response.data?.hasPrevious,
                hasNextPage: response.data?.hasNext,
                pages: response.data?.pages
            });
        });
    }

    render() {
        return (
            <>
                <h1>Категории продуктов</h1>
                <Link to="/admin/categories/create" className="btn btn-success">Создать</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Путь</th>
                            <th scope="col">Назначаемая</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.categories.map((category, idx) => (
                        <tr key={idx}>
                            <th scope="row">{category.id}</th>
                            <td>{category.title}</td>
                            <td>{category.path}</td>
                            <td>{category.assignable ? "да" : "нет" }</td>
                            <td><a href={"/admin/categories/update/" + category.id} className="btn btn-primary">Редактировать</a><div className="btn btn-danger">Удалить</div></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Paginator pageNumber={this.state.pageNumber} totalPages={this.state.pages} hasNextPage={this.state.hasNextPage} hasPreviousPage={this.state.hasPreviousPage} onChangePage={(page) => this.getPage(page)}/>
            </>
        );
    }
}
