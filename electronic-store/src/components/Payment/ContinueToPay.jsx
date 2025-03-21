import "../../css/ContinueToPay.css"
import laptop from "../../assets/Laptop.jpg"
import { Link } from "react-router-dom"
const ContinueToPay = () => {
    return (
        <div className="your-order">
            <h2>Your Order</h2>
            <div className="y-card-container">
                {/* Card */}
                <div className="y-card">
                    <div className="y-card-image">
                        <img src={laptop} alt="laptop"></img>
                    </div>
                    <div className="y-card-info">
                        <p>MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch</p>
                        <div className="y-card-info-price">
                            <span>x1</span>
                            <div>
                                <span style={{marginRight:"6px"}}>$433</span>
                                <span style={{color:"#717171"}}>from $1200</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                {/* Card */}
                {/* Container set max height, make able to scroll */}
            </div>

            <div className="y-discount">
                <input type="text"></input>
                <button>Apply</button>
            </div>
            <div className="y-price">
                <div>
                    <span>Subtotal</span>
                    <span>$519</span>
                </div>
                <div>
                    <span>Discount</span>
                    <span>$519</span>
                </div>
                <div>
                    <span>Shipment cost</span>
                    <span>$519</span>
                </div>
            </div>
            <hr></hr>
            <div style={{display:"flex", justifyContent:"space-between", fontWeight:"bold"}}>
                <span>Grand Total</span>
                <span style={{color:"#717171"}}>$543</span>
            </div>
            <div className="btn-continue">
                <Link to="/payment"><button>Continue to pay</button></Link>
            </div>
        </div>
    )
}

export default ContinueToPay