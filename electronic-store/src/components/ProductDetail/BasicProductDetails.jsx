import React, { useState, useEffect } from "react";
import laptop from "../../assets/Laptop.jpg";
import "../../css/BasicProductDetails.css";

const BasicProductDetails = ({ product }) => {
    const images = [laptop, laptop, laptop, laptop, laptop];
    const [mainImage, setMainImage] = useState(images[0]);
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

    return (
        <div className="BPD-container">
            <div className="BPD-gallery">
                <div className="BPD-gallery-mainImg">
                    <img src={product.image} alt="Product" />
                </div>
                {/* <div className="BPD-gallery-subImg">
                    {images.map((image, index) => (
                        <img key={index} src={product.image} onClick={() => setMainImage(image)} className="subImage" alt="Thumbnail" />
                    ))}
                </div> */}
            </div>

            <div className="BPD-details">
                <h3>{product.name}</h3>

                <div className="rating-section">
                    <span className="rating">
                        <i className="bi bi-star-fill star-icon"></i> {averageRating}
                    </span>
                    <span className="stick">|</span> <span className="sold">Sold {product.sales_count}</span>
                </div>

                <div className="product-availability">
                    <span className="availability in-stock">
                        <i className="bi bi-shop-window"></i> In Stock
                    </span>
                    <span className="availability guaranteed">
                        <i className="bi bi-patch-check"></i> Guaranteed
                    </span>
                    <span className="availability delivery">
                        <i className="bi bi-truck"></i> Free Delivery
                    </span>
                </div>

                <div className="product-specs">
                    <ul>
                        <li>
                            <strong>Brand:</strong> <span>{product.brand?.name}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BasicProductDetails;
