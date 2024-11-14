import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import Paginator from "../admin_components/Paginatior";
import constants from "../../constants";


export default class AdminAttributeNamesPage extends React.Component {
    state = {
        attributeNames: [],
        pageNumber: 1,
        hasPreviousPage: false,
        hasNextPage: true,
        pages: 1,
        attributeCategories: [],
        attributeCategoriesDict: {}
    }

    componentDidMount() {
        this.getPage(1);
        this.getAttributeCategories();
    }

    getAttributeCategories() {
        axios.get(constants.SERVER_ADDRESS + "/api/admin/all-attribute-categories/").then(response => {
            let attributeCategoriesDict = {}, attributeCategories = response.data;
            for (let i = 0; i < attributeCategories?.length; i++) {
                attributeCategoriesDict[attributeCategories[i].id] = attributeCategories[i];
            }
            this.setState({
                ...this.state,
                attributeCategories,
                attributeCategoriesDict
            });
        });
    }

    getPage(pageNumber) {
        axios.get(constants.SERVER_ADDRESS + "/api/admin/attribute-name/?page=" + pageNumber).then(response => {
            this.setState({
                ...this.state,
                attributeNames: response.data?.results,
                pageNumber: response.data?.pageNumber,
                hasPreviousPage: response.data?.hasPrevious,
                hasNextPage: response.data?.hasNext,
                pages: response.data?.pages
            });
        });
    }

    handleDelete(id, title) {
        const answer = confirm("Удалить \"" + title + "\"?");
        if (answer) {
            axios.delete(`${constants.SERVER_ADDRESS}/api/admin/attribute-name/${id}/`)
            .then(() => this.getPage(1));
        }
    }

    render() {
        return (
            <>
                <h1>Названия атрибутов</h1>
                <Link to="/admin/attribute-names/create" className="btn btn-success">Создать</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Название</th>
                            <th scope="col">Категория атрибутов</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.attributeNames.map((attributeName, idx) => (
                        <tr key={idx}>
                            <th scope="row">{attributeName.id}</th>
                            <td>{attributeName.title}</td>
                            <td>{this.state.attributeCategoriesDict[attributeName.attribute_category] ? this.state.attributeCategoriesDict[attributeName.attribute_category].title : "удалена"}</td>
                            <td><a href={"/admin/attribute-names/update/" + attributeName.id} className="btn btn-primary">Редактировать</a><div className="btn btn-danger" onClick={() => this.handleDelete(attributeName.id, attributeName.title)}>Удалить</div></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Paginator pageNumber={this.state.pageNumber} totalPages={this.state.pages} hasNextPage={this.state.hasNextPage} hasPreviousPage={this.state.hasPreviousPage} onChangePage={(page) => this.getPage(page)}/>
            </>
        );
    }
}
