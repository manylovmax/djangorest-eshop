import React from "react";
import { Link } from "react-router-dom";
import MenuCategoriesButton from "./MenuCategoriesButton"
import SearchBar from "./SearchBar"

import { useAuth } from "./hooks/useAuth";

export default function TopBar() {  
    const { user } = useAuth();

    return (
        <div className="top-bar">
            <div className="row">
                <div className="col-md-2">
                    <MenuCategoriesButton />
                </div>
                <div className="col-md-6">
                    <SearchBar/>
                </div>
                <div className="col-md-4">
                    { user ? <Link to="/user/account" className="btn btn-success">Аккаунт</Link> : <Link to="/login" className="btn btn-success">Войти</Link> } 
                    Заказы, Избранное, Корзина 
                </div>
            </div>
        </div>
   );
}
