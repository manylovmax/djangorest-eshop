import React from "react";
import MenuCategoriesButton from "./MenuCategoriesButton"
import SearchBar from "./SearchBar"

export default function TopBar() { 
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
                Войти, Заказы, Избранное, Корзина 
            </div>
        </div>
    </div>
   );
}
