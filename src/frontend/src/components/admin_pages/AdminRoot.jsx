import React from "react";
import { Outlet, Link } from "react-router-dom";


export default function AdminRoot() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Link className="admin-sidebar-link" to="/admin/categories">Категории продуктов</Link>
                    <Link className="admin-sidebar-link" to="/admin/products">Продукты</Link>
                    <Link className="admin-sidebar-link" to="/admin/attribute-categories">Категории атрибутов</Link>
                    <Link className="admin-sidebar-link" to="/admin/attribute-names">Названия атрибутов</Link>
                    <Link className="admin-sidebar-link" to="/admin/attributes-values">Значения атрибутов</Link>
                </div>
                <div className="col-md-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
