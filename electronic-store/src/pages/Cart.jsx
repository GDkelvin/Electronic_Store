import PaymentProductCard from "../components/Payment/PaymentProductCard";
import PaymentDetails from "../components/Payment/PaymentDetails";
import styles from "../css/Cart.module.css"
const Cart = () => {
    return (
        <div className={styles.Cart}>
            <div className={styles["payment-product-card"]}>
                <PaymentProductCard></PaymentProductCard>
                <PaymentProductCard></PaymentProductCard>
                <PaymentProductCard></PaymentProductCard>
            </div>
            <div className={styles["payment-details"]}>
                <PaymentDetails></PaymentDetails>
            </div>
        </div>
    )
}

export default Cart