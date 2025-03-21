import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/ProductCategory.css";
const categories = [
    { name: "Mobile", icon: "bi-phone" },
    { name: "Laptop", icon: "bi-laptop" },
    { name: "Tablet", icon: "bi-tablet" },
    { name: "Audio", icon: "bi-headphones" },
  ];

const ProductCategory = () =>{
    return (
        <>
        <div className="category-tabs">
            {categories.map((cat,index)=>(
                <div key={index} className="category">
                    <i className={`bi ${cat.icon}`}></i> {cat.name}
                </div>

            ))}
        </div>
        </>
    );
}

export default ProductCategory