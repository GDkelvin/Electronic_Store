import React from "react";
import "../../css/PaymentProductCard.css";
import laptop from "../../assets/Laptop.jpg";
const PaymentProductCard = () => {
    return (
        <div className="PPD">
            <div className="PPD-image">
                <img src={laptop} alt="a" />
            </div>
            <div className="PPD-info">
                <h3>Macbook </h3>
                <div className="PPD-info-2">
                    <div className="PPD-price">
                        <span className="original-price">$1200</span>
                        <span className="discounted-price">$400</span>
                    </div>
                    <div className="PPD-actions">
                        <span className="quantity-controls">
                            <i className="bi bi-trash text-danger"></i>
                            <button className="decrease">-</button>
                            <span className="quantity">1</span>
                            <button className="increase">+</button>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentProductCard;
