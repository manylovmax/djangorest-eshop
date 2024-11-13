import React from "react";
import { Outlet } from "react-router-dom";


export default function AdminRoot() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <a className="admin-sidebar-link" href="/admin/categories">Категории продуктов</a>
                    <a className="admin-sidebar-link" href="/admin/products">Продукты</a>
                    <a className="admin-sidebar-link" href="/admin/attribute-categories">Категории атрибутов</a>
                    <a className="admin-sidebar-link" href="/admin/attribute-names">Названия атрибутов</a>
                    <a className="admin-sidebar-link" href="/admin/attributes-values">Значения атрибутов</a>
                </div>
                <div className="col-md-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
