import React from "react";
import "../../css/ProductCard.css";
import laptopImg from "../../assets/laptop.jpg";
import line from "../../assets/line.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    if (!product) return <p>Loading ...</p>;

    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);
    const discountedPrice = discount > 0
        ? (price * (1 - discount)).toFixed(2)
        : price.toFixed(2);
    const discountPercentage = discount > 0 ? `-${(discount * 100).toFixed(0)}%` : null;

    return (
        <Link to={`/products/${product.id}`}>
            <div className="product-card">
                {discount > 0 && <div className="product-discount">{discountPercentage}</div>}
                
                <div className="product-image">
                    <img src={laptopImg} alt={product.name} />
                </div>

                <img src={line} alt="divider" className="line" />

                <div className="product-info">
                    <p className="product-name">{product.name}</p>

                    <div className="product-footer">
                        <span className="product-price">${discountedPrice}</span>
                        {discount > 0 && (
                            <span className="product-old-price" style={{ textDecoration: "line-through", color: "gray", marginLeft: "8px" }}>
                                ${price.toFixed(2)}
                            </span>
                        )}
                        <div className="product-rating">
                            <i className="bi bi-star-fill star-icon"></i>
                            <span className="rating-score">4.3</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
