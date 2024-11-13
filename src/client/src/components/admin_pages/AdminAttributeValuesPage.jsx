import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import Paginator from "../admin_components/Paginatior";
import constants from "../../constants";


export default class AdminAttributeValuesPage extends React.Component {
    state = {
        attributeValues: [],
        pageNumber: 1,
        hasPreviousPage: false,
        hasNextPage: true,
        pages: 1,
        attributeNames: [],
        attributeNamesDict: {}
    }

    componentDidMount() {
        this.getPage(1);
        this.getattributeNames();
    }

    getattributeNames() {
        axios.get(constants.SERVER_ADDRESS + "/products/all-attribute-names/").then(response => {
            let attributeNamesDict = {}, attributeNames = response.data;
            for (let i = 0; i < attributeNames?.length; i++) {
                attributeNamesDict[attributeNames[i].id] = attributeNames[i];
            }
            this.setState({
                ...this.state,
                attributeNames,
                attributeNamesDict
            });
        });
    }

    getPage(pageNumber) {
        axios.get(constants.SERVER_ADDRESS + "/products/attribute-value/?page=" + pageNumber).then(response => {
            this.setState({
                ...this.state,
                attributeValues: response.data?.results,
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
            axios.delete(`${constants.SERVER_ADDRESS}/products/attribute-name/${id}/`)
            .then(() => this.getPage(1));
        }
    }

    render() {
        return (
            <>
                <h1>Значения атрибутов</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">ID продукта</th>
                            <th scope="col">Название атрибута</th>
                            <th scope="col">Значение</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.state.attributeValues.map((attributeValue, idx) => (
                        <tr key={idx}>
                            <th scope="row">{attributeValue.id}</th>
                            <td>{attributeValue.product}</td>
                            <td>{this.state.attributeNamesDict[attributeValue.attribute_name] ? this.state.attributeNamesDict[attributeValue.attribute_name].title : "удалено"}</td>
                            <td>{attributeValue.value}</td>
                            <td><a href={"/admin/attributes-values/update/" + attributeValue.id} className="btn btn-primary">Редактировать</a><div className="btn btn-danger" onClick={() => this.handleDelete(attributeValue.id, attributeValue.value)}>Удалить</div></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Paginator pageNumber={this.state.pageNumber} totalPages={this.state.pages} hasNextPage={this.state.hasNextPage} hasPreviousPage={this.state.hasPreviousPage} onChangePage={(page) => this.getPage(page)}/>
            </>
        );
    }
}
