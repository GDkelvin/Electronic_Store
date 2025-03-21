import React from "react";
import "../../css/ProductCard.css";
import laptopImg from "../../assets/laptop.jpg";
import line from "../../assets/line.png";
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {
    //{`/product/${product.name.replace(/\s+/g, "-")}`}
    const productSlug = product.name.replace(/\s+/g, "-").toLowerCase();
    if(!product) return (<p>Loading ...</p>);
    return (
        <>
            <Link to={`/products/${product.id}`}>
                <div className="product-card">
                    <div className="product-discount">-12%</div>
                        
                    <div className="product-image">
                        <img src={laptopImg} alt="Apple MacBook Air 15" />
                    </div>

                    <img src={line} alt="divider" className="line" />

                    <div className="product-info">
                        <p className="product-name">{product.name}</p>

                        <div className="product-footer">
                            <span className="product-price">${Number(product.price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <div className="product-rating">
                                <i className="bi bi-star-fill star-icon"></i>
                                <span className="rating-score">4.3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        </>
    );
};

export default ProductCard;
