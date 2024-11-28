import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import Paginator from "../admin_components/Paginatior";

import constants from "../../constants";


export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pages, setPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false); 
    const [hasPreviousPage, setHasPreviousPage] = useState(false); 

    useEffect(() => {
        getPage(pageNumber);
    }, []);

    function getPage(number) {
        axios.get(`${constants.SERVER_ADDRESS}/api/admin/product/?page=${number}`).then(response => {
            setPageNumber(number);
            setProducts(response.data?.results);
            setHasNextPage(response.data?.hasNext);
            setHasPreviousPage(response.data?.hasPrevious);
            setPages(response.data?.pages);
        });
    }

    function handleDelete(id, title) {
        const answer = confirm("Удалить \"" + title + "\"?");
        if (answer) {
            axios.delete(`${constants.SERVER_ADDRESS}/api/admin/product/${id}/`)
            .then(() => getPage(1));
        }
    }

    return (
        <>
            <h1>Продукты</h1>
            <Link to="/admin/products/create" className="btn btn-success">Создать</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                { products.map((product, idx) => (
                    <tr key={idx}>
                        <th scope="row">{product.id}</th>
                        <td>{product.title}</td>
                        <td>
                            <Link to={"/admin/products/update/" + product.id} className="btn btn-primary">Редактировать</Link>
                            <span className="btn btn-danger" onClick={() => handleDelete(product.id, product.title)}>Удалить</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Paginator pageNumber={pageNumber} totalPages={pages} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} onChangePage={(pageNumber) => getPage(pageNumber)}/>
        </>
    );
}
