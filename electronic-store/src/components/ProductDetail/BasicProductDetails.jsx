import React, { useState, useEffect } from "react";
import laptop from "../../assets/Laptop.jpg"
import "../../css/BasicProductDetails.css"

const BasicProductDetails = ({product}) => {
    const images = [laptop, laptop, laptop, laptop, laptop]
    const [mainImage, setMainImage] = useState(images[0]);
    return (
        <>
            <div className="BPD-container">
                <div className="BPD-gallery">
                    <div className="BPD-gallery-mainImg">
                        <img src={mainImage}></img>
                    </div>
                    <div className="BPD-gallery-subImg">
                        {images.map((image, index) => (
                            <img key={index} src={image} onClick={() => setMainImage(image)} className="subImage"></img>
                        ))}
                    </div>
                </div>

                <div className="BPD-details">
                    <h3>{product.name}</h3>

                    <div className="rating-section">
                        <span className="rating"><i className="bi bi-star-fill star-icon"></i> 4.9</span> <span className="stick">|</span> <span className="sold">Sold 125</span>
                    </div>
                    
                    <div className="product-availability" >
                        <span className="availability in-stock"><i className="bi bi-shop-window"></i> In Stock </span>
                        <span className="availability guaranteed"><i className="bi bi-patch-check"></i> Guaranteed </span>
                        <span className="availability delivery"><i className="bi bi-truck"></i> Free Delivery </span>
                    </div>

                    <div className="product-specs">
                        <ul>
                            <li><strong>Brand:</strong> <span>{product.brand?.name}</span></li>
                        </ul>

                    </div>

                </div>
            </div>
        </>
    )

}

export default BasicProductDetails