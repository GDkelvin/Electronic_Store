import React from "react";
import { useNavigate } from "react-router-dom"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/ProductCategory.css";
import {  useSearchParams } from "react-router-dom";
const categories = [
    { name: "Mobile", icon: "bi-phone" },
    { name: "Laptop", icon: "bi-laptop" },
    { name: "Tablet", icon: "bi-tablet" },
    { name: "Audio", icon: "bi-headphones" },
];
const ProductCategory = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleCategoryClick = (category) => {
        const currentCategory = searchParams.get("name"); 
        if (currentCategory === category) {
            navigate("/products");
        } else {
            navigate(`/products/category?name=${category}`);
        }
    };

    return (
        <div className="category-tabs">
            {categories.map((cat, index) => (
                <div
                    key={index}
                    className={`category ${searchParams.get("name") === cat.name ? "active" : ""}`}
                    onClick={() => handleCategoryClick(cat.name)}
                >
                    <i className={`bi ${cat.icon}`}></i> {cat.name}
                </div>
            ))}
        </div>
    );
};

export default ProductCategory;
