import React from "react";

export default function Paginator({pageNumber, totalPages, hasNextPage, hasPreviousPage, onChangePage}) {
    function callIfTrue(callback, flag) {
        if (flag) {
            callback();
        }
    }
    if (totalPages)
        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={"page-item " + (hasPreviousPage ? "" : "disabled")}>
                        <a className="page-link" onClick={() => callIfTrue(() => onChangePage(pageNumber - 1), hasPreviousPage)}>Предыдущая</a>
                    </li>
                    { pageNumber != 1 
                        ? <li className="page-item"><a className="page-link" onClick={() => callIfTrue(() => onChangePage(1), true)}>1</a></li>
                        : "" 
                    }
                    
                    <li className="page-item active"><a className="page-link">{pageNumber}</a></li>

                    { pageNumber != totalPages
                        ? <li className="page-item"><a className="page-link" onClick={() => callIfTrue(() => onChangePage(totalPages), true)}>{totalPages}</a></li>
                        : "" 
                    }
                    <li className={"page-item " + (hasNextPage ? "" : "disabled")}>
                        <a className="page-link" onClick={() => callIfTrue(() => onChangePage(pageNumber + 1), hasNextPage)}>Следующая</a>
                    </li>
                </ul>
            </nav>
        );
    else
        return "";
}