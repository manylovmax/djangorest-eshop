import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import constants from "../../constants";
import ProductCard from "../ProductCard";
import Paginator from "../Paginatior";


export default function CategoryPage() {
    const {categoryId} = useParams(); 
    const [products, setProducts] = useState([]);
    const [imagesUrls, setImagesUrls] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    function getPage(number) {
        setPageNumber(number);
        axios.get(constants.SERVER_ADDRESS + "/api/get-products-cards/" + categoryId + "?page=" + number).then(response => {
            const results = response.data.results;
            setTotalPages(response.data.pages);
            setHasNextPage(response.data.hasNext);
            setHasPreviousPage(response.data.hasPrevious);
            setProducts(results);
            let newImagesUrls = {};
            for(let i = 0; i < results.length; i++) {
                let urls = [];
                for (let j = 0; j < results[i].images.length; j++) {
                    urls.push(constants.SERVER_ADDRESS + results[i].images[j].file)
                }
                newImagesUrls[results[i].id] = urls;
            }
            setImagesUrls(newImagesUrls);
        });
    }

    useEffect(() => {
        getPage(1);
    }, [categoryId]);


    return (
        <div className="row">
            <div className="col-md-2">
                ФИЛЬТРЫ
            </div>
            <div className="col-md-10">
                <div className="row">
                { products.map((product, idx) => (
                    <div key={idx} className="col-md-3">
                        <a className="product-card-link" href={"/products/" + product.id} target="_blank">
                            <ProductCard imagesUrls={imagesUrls[product.id]} title={product.title} />
                        </a>
                    </div>
                ))}
                </div>
                <Paginator pageNumber={pageNumber} totalPages={totalPages} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} onChangePage={(number)=> getPage(number)}/>
            </div>
        </div>
    )
}
