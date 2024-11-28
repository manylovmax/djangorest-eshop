import React from "react";


export default function ProductDetails({product, attributeCategoriesWithAttributes, attributeValues}) {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    {product.description}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    Комплектация
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {attributeCategoriesWithAttributes.map((category, key) => (
                        <div className="mb-3 card p-3" key={key}>
                            <h5>{category.attributeCategoryTitle}</h5>
                            <div className="row">
                            {category.attributeNames.map((attributeName, idx) => {
                                if (attributeValues.hasOwnProperty(attributeName.attributeNameId))
                                    return(
                                        <div className="mb-3 col-md-6" key={attributeName.attributeNameId}>
                                            <div className="attribute">
                                                <div className="attribute__title"><span className="attribute__title-text">{attributeName.attributeNameTitle}</span></div><div className="attribute__value">{attributeValues.hasOwnProperty(attributeName.attributeNameId) ? attributeValues[attributeName.attributeNameId]: ""}</div>
                                            </div>
                                        </div>
                                    )
                                else
                                    return ""
                            })}
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
}
