import React from "react";
import { Link } from "react-router-dom";
import "../../css/AddToCart.css";

const AddToCart = ({ product }) => {
    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);
    const discountedPrice = discount > 0
        ? (price * (1 - discount)).toFixed(2)
        : price.toFixed(2);
    const discountPercentage = discount > 0 ? `${(discount * 100).toFixed(0)}%` : null;

    return (
        <div className="ATC-container">
            <div className="ATC-container-2">
                <div className="ATC-price">
                    <span className="price">${discountedPrice}</span>
                    {discount > 0 && <span className="sale">-{discountPercentage}</span>}
                </div>
                {discount > 0 && (
                    <p className="ATC-last-price">
                        Last price <s>${price.toFixed(2)}</s>
                    </p>
                )}

                <Link to="/cart">
                    <button className="buy">Buy now</button>
                </Link>
                <button className="add-to-cart">Add to cart</button>
            </div>
        </div>
    );
};

export default AddToCart;
