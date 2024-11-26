import { useState } from "react";

export default function ProductCard ({imagesUrls, title}) {
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    return (
        <div className="product-card">
            <div className="images-slider">
                <img className="img-fluid" src={imagesUrls[currentImageIdx]} />
            </div>
            <div className="title">{title}</div>
        </div>
    )
}