import React, { useState } from "react";


export default function ProductPhotos(props) {
    const photos_urls = [
        "https://ir.ozone.ru/s3/multimedia-1-6/wc1000/6922147206.jpg",
        "https://ir.ozone.ru/s3/multimedia-1-d/wc1000/6922147213.jpg",
        "https://ir.ozone.ru/s3/multimedia-1-k/wc1000/6922147220.jpg",
        "https://ir.ozone.ru/s3/multimedia-1-c/wc1000/6922147212.jpg",
        "https://ir.ozone.ru/s3/multimedia-m/wc1000/6900623290.jpg",
        "https://ir.ozone.ru/s3/multimedia-i/wc1000/6900623574.jpg",
        "https://ir.ozone.ru/s3/multimedia-o/wc1000/6900623580.jpg",
        "https://ir.ozone.ru/s3/multimedia-r/wc1000/6900623583.jpg",
    ];
    const [activePhotoIdx, setActivePhotoIdx] = useState(0)

    return (
        <div className="product-photos d-flex flex-row">
            <div className="product-photos__thumbnail-container d-flex flex-column">
                { photos_urls.map((photo_url, idx) => (
                    <img key={idx} onClick={() => setActivePhotoIdx(idx)} className={"product-photos__thumbnail " + ( idx == activePhotoIdx ? "product-photos__thumbnail-active" : "")} src={photo_url} alt="" />
                ))}
            </div>
            <div>
                <img className="product-photos__main-photo" src={photos_urls[activePhotoIdx]} alt="" />
            </div>
        </div>
    );
}
