import styles from "../../css/PaymentMethod.module.css";
import { useState } from "react";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  return (
    <div className={styles.paymentBillingContainer}>
      <h3>Payment</h3>
      <div className={styles.paymentMethod}>
        <label className={`${styles.label} ${paymentMethod === "creditCard" ? styles.selected : ""}`}>
          <input
            type="radio"
            name="payment"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={() => setPaymentMethod("creditCard")}
          />
          <span>Credit Cards</span>
          <span className={styles.cardInfo}></span>
          <button className={styles.editButton}>✏️</button>
          {/* <button className={styles.addButton}>+</button> */}
        </label>
        <label className={`${styles.labelPaypal} ${paymentMethod === "paypal" ? styles.selected : ""}`}>
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          <span className={styles.paypalText}>PayPal</span>
        </label>
      </div>

      <h3>Billing address</h3>
      <div className={styles.billingAddress}>
        <span>Same as shipping address</span>
        <button className={styles.editButton}>✏️</button>
      </div>
    </div>
  );
};

export default PaymentMethod;
