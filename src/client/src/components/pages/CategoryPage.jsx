import React, {useState, useEffect} from "react";
import axios from "axios";


export default function CategoryPage() {
    const [products, setProducts] = useState([1,2,3,4,5,6,7,8]);

    useEffect(() => {
        // axios.get();
    }, []);

    return (
        <div className="row">
            <div className="col-md-2">
                ФИЛЬТРЫ
            </div>
            <div className="col-md-10">
                <div className="row">
                { products.map((product, idx) => (
                    <div key={idx} className="col-md-3">
                        КАРТОЧКА ПРОДУКТА
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
