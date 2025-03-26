import React, { useEffect, useState } from "react";
import PaymentMethod from "../components/Payment/PaymentMethod";
import ContinueToPay from "../components/Payment/ContinueToPay";

const Payment = () => {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("creditCard");

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
        setAddress(JSON.parse(localStorage.getItem("address")));
    }, []);

    return (
        <div className="payment">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "60%" }}>
                    <PaymentMethod 
                        address={address} 
                        paymentMethod={paymentMethod} 
                        setPaymentMethod={setPaymentMethod} 
                    />
                    <a href="/checkout" style={{ color: "#0C68F4", marginTop: "20px", display: "block" }}>
                        Return to Checkout
                    </a>
                </div>
                <div style={{ width: "40%" }}>
                    <ContinueToPay 
                        cart={cart} 
                        address={address} 
                        paymentMethod={paymentMethod} 
                        setPaymentMethod={setPaymentMethod} 
                        isPaymentPage={true} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Payment;
