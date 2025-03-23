import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/AddToCart.css";

const AddToCart = ({ product }) => {
    const navigate = useNavigate();
    const [cartUpdated, setCartUpdated] = useState(false);

    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);
    const discountedPrice = discount > 0
        ? (price * (1 - discount)).toFixed(2)
        : price.toFixed(2);
    const discountPercentage = discount > 0 ? `${(discount * 100).toFixed(0)}%` : null;

    const updateCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartUpdated(true);

        setTimeout(() => setCartUpdated(false), 2000);
    };

    const handleBuyNow = () => {
        updateCart();
        navigate("/cart"); 
    };

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

                <button className="buy" onClick={handleBuyNow}>Buy now</button>
                <button className="add-to-cart" onClick={updateCart}>Add to cart</button>

                {cartUpdated && <p className="cart-message">Added to cart!</p>}
            </div>
        </div>
    );
};

export default AddToCart;
