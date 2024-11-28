import React, { useState } from "react";


export default function ProductPhotos({imagesUrls}) {
    const [activePhotoIdx, setActivePhotoIdx] = useState(0)

    return (
        <div className="product-photos">
            <div className="product-photos__thumbnail-container">
                { imagesUrls.map((image_url, idx) => (
                    <img key={idx} onClick={() => setActivePhotoIdx(idx)} className={"product-photos__thumbnail " + ( idx == activePhotoIdx ? "product-photos__thumbnail-active" : "")} src={image_url} alt="" />
                ))}
            </div>
            <div className="main-photo">
                <img className="main-photo__image" src={imagesUrls[activePhotoIdx]} alt="" />
            </div>
        </div>
    );
}
