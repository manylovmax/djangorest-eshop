import React, {useState} from "react";

export default function MenuCategoriesButton() {
    const [menuVisible, setMenuVisible] = useState(false);
    function handleClick() {
        setMenuVisible(!menuVisible);
    }

    return (
        <>
            <div onClick={handleClick} className="menu-categories-button btn btn-primary">Каталог</div>
            <div className={"menu-categories-content " + (menuVisible ? "" : "d-none")}>
                <div>Электроника</div>
                <div>Одежда</div>
                <div>Обувь</div>
                <div>Дом и сад</div>
                <div>Детские товары</div>
                <div>Красота и здоровье</div>
                <div>Бытовая техника</div>
                <div>Спорт и отдых</div>
                <div>Строительство и ремонт</div>
                <div>Продукты питания</div>
                <div>Аптека</div>
                <div>Товары для животных</div>
                <div>Книги</div>
                <div>Туризм, рыбалка, охота</div>
                <div>Автотовары</div>
                <div>Мебель</div>
                <div>Хобби и творчество</div>
            </div>
        </>
    )
}