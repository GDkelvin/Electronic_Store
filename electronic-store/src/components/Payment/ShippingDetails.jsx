import "../../css/ShippingDetails.css";
import { useState } from "react";

const ShippingDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState({
        street: "25 Đường First, Phường 1",
        district: "Quận Bình Thạnh",
        city: "TP. Hồ Chí Minh",
        postalCode: "700000"
    });

    const [tempAddress, setTempAddress] = useState({ ...address });

    const handleOpenModal = () => {
        setTempAddress(address); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        setAddress(tempAddress); 
        setIsModalOpen(false);
    };

    return (
        <div className="Shipping-detail">
            <div className="SD-container">
                <label>Tên người nhận</label>
                <input type="text" value="Quoc Bao" readOnly />

                <label>Gửi đến</label>
                <div className="editable-input">
                    <input 
                        type="text" 
                        value={`${address.street}, ${address.district}, ${address.city}`} 
                        readOnly 
                    />
                    <i className="bi bi-pencil edit-icon" onClick={handleOpenModal}></i>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Address Details</h2>

                        <label>Address</label>
                        <input 
                            type="text" 
                            value={tempAddress.street} 
                            onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })} 
                        />

                        <label>District</label>
                        <input 
                            type="text" 
                            value={tempAddress.district} 
                            onChange={(e) => setTempAddress({ ...tempAddress, district: e.target.value })} 
                        />

                        <label>City</label>
                        <input 
                            type="text" 
                            value={tempAddress.city} 
                            onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })} 
                        />

                        <label>Postal Code</label>
                        <input 
                            type="text" 
                            value={tempAddress.postalCode} 
                            onChange={(e) => setTempAddress({ ...tempAddress, postalCode: e.target.value })} 
                        />

                        <div className="modal-actions">
                            <button onClick={handleCloseModal}>Hủy</button>
                            <button onClick={handleSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingDetails;
