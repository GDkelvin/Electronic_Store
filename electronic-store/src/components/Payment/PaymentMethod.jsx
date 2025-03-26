import styles from "../../css/PaymentMethod.module.css";
import { useState } from "react";

const PaymentMethod = ({ address, setPaymentMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const handleChange = (method) => {
    setSelectedMethod(method);
    setPaymentMethod(method); 
  };
  return (
    <div className={styles.paymentBillingContainer}>
      <h3>Payment</h3>
      <div className={styles.paymentMethod}>
        <label className={`${styles.label} ${selectedMethod === "creditCard" ? styles.selected : ""}`}>
          <input
            type="radio"
            name="payment"
            value="creditCard"
            checked={selectedMethod === "creditCard"}
            onChange={() => handleChange("creditCard")}
          />
          <span>Credit Cards</span>
          <span className={styles.cardInfo}></span>
          <button className={styles.editButton}></button>
        </label>
        <label className={`${styles.labelPaypal} ${selectedMethod === "paypal" ? styles.selected : ""}`}>
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={() => handleChange("paypal")}
          />
          <span className={styles.paypalText}>PayPal</span>
        </label>
      </div>

      <h3>Billing address</h3>
      <div className={styles.billingAddress}>
        {address ? (
          <span>{`${address.street}, ${address.district}, ${address.city}, ${address.postalCode}`}</span>
        ) : (
          <span>No address provided</span>
        )}
        <button className={styles.editButton}></button>
      </div>
    </div>
  );
};

export default PaymentMethod;
