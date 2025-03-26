import React, { useState, useEffect } from "react";
import "../../css/ProductCard.css";
import laptopImg from "../../assets/laptop.jpg";
import line from "../../assets/line.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await fetch(`http://localhost:3000/review/average/${product.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch average rating");
                }
                const data = await response.json();
                setAverageRating(data.averageRating.toFixed(1)); 
            } catch (error) {
                console.error("Error fetching rating:", error);
            }
        };

        if (product?.id) {
            fetchAverageRating();
        }
    }, [product?.id]);

    if (!product) return <p>Loading ...</p>;

    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);
    const discountedPrice = discount > 0
        ? (price * (1 - discount)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const formattedOriginalPrice = price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const discountPercentage = discount > 0 ? `-${(discount * 100).toFixed(0)}%` : null;

    return (
        <Link to={`/products/${product.id}`}>
            <div className="product-card">
                {discount > 0 && <div className="product-discount">{discountPercentage}</div>}

                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>

                <img src={line} alt="divider" className="line" />

                <div className="product-info">
                    <p className="product-name">{product.name}</p>

                    <div className="product-footer">
                        <span className="product-price">${discountedPrice}</span>
                        {discount > 0 && (
                            <span className="product-old-price" style={{ textDecoration: "line-through", color: "gray", marginLeft: "8px" }}>
                                ${formattedOriginalPrice}
                            </span>
                        )}
                        <div className="product-rating">
                            <i className="bi bi-star-fill star-icon"></i>
                            <span className="rating-score">{averageRating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
