import ShippingDetails from "../components/Payment/ShippingDetails";
import ContinueToPay from "../components/Payment/ContinueToPay";
const Checkout = () => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{width:"60%"}}>
                <ShippingDetails></ShippingDetails>
                <a href="/cart" style={{color:"#0C68F4", marginTop:"20px", display:"block"}}>Return to Cart</a>
            </div>
            <div style={{width:"40%"}}>
                <ContinueToPay></ContinueToPay>
            </div>

        </div>
    )
}

export default Checkout