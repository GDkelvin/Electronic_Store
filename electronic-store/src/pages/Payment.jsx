import React from "react";
import PaymentProductCard from "../components/Payment/PaymentProductCard";
import PaymentDetails from "../components/Payment/PaymentDetails";
import ShippingDetails from "../components/Payment/ShippingDetails";
import ContinueToPay from "../components/Payment/ContinueToPay";
import PaymentMethod from "../components/Payment/PaymentMethod";
const Payment = () => {
    return (
        <div className="payment">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "60%" }}>
                    <PaymentMethod></PaymentMethod>
                    <a href="/checkout" style={{ color: "#0C68F4", marginTop: "20px", display: "block" }}>Return to Checkout</a>
                </div>
                <div style={{ width: "40%" }}>
                    <ContinueToPay></ContinueToPay>
                </div>

            </div>

        </div>
    )
}

export default Payment