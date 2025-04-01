import "../../css/ShippingDetails.css";
import { useState, useEffect } from "react";

const cities = {
    "Hồ Chí Minh": ["Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5"],
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn"]
};

const ShippingDetails = ({ setAddress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setLocalAddress] = useState({
        street: "",
        district: "",
        city: "",
        postalCode: ""
    });
    const [firstName, setFirstName] = useState("");
    useEffect(() => {
        const storedAddress = localStorage.getItem("address");
        if (storedAddress) {
            setLocalAddress(JSON.parse(storedAddress));
        }

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFirstName(user.first_name || "User"); 
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const newAddress = localStorage.getItem("address");
            if (!newAddress) {
                setLocalAddress({ street: "", district: "", city: "", postalCode: "" });
                setAddress({ street: "", district: "", city: "", postalCode: "" });
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [setAddress]);

    const [tempAddress, setTempAddress] = useState({ ...address });

    const handleOpenModal = () => {
        setTempAddress(address);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        setLocalAddress(tempAddress);
        setAddress(tempAddress);
        localStorage.setItem("address", JSON.stringify(tempAddress));
        setIsModalOpen(false);
    };

    return (
        <div className="Shipping-detail">
            <div className="SD-container">
                <label>User</label>
                <input type="text" value={firstName} readOnly />

                <label>Ship to</label>
                <div className="editable-input">
                    <input
                        type="text"
                        value={address.street ? `${address.street}, ${address.district}, ${address.city}` : "No address entered"}
                        readOnly
                    />
                    <i className="bi bi-pencil edit-icon" onClick={handleOpenModal}></i>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Address Details</h2>

                        <label>City</label>
                        <select
                            value={tempAddress.city}
                            onChange={(e) => {
                                const selectedCity = e.target.value;
                                setTempAddress({ ...tempAddress, city: selectedCity, district: "" });
                            }}
                        >
                            <option value="">Select City</option>
                            {Object.keys(cities).map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                        <label>District</label>
                        <select
                            value={tempAddress.district}
                            onChange={(e) => setTempAddress({ ...tempAddress, district: e.target.value })}
                            disabled={!tempAddress.city}
                        >
                            <option value="">Select District</option>
                            {Array.isArray(cities[tempAddress.city]) && cities[tempAddress.city].map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>

                        <label>Street</label>
                        <input
                            type="text"
                            value={tempAddress.street}
                            onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                        />

                        <label>Postal Code</label>
                        <input
                            type="text"
                            value={tempAddress.postalCode}
                            onChange={(e) => setTempAddress({ ...tempAddress, postalCode: e.target.value })}
                        />

                        <div className="modal-actions">
                            <button onClick={handleCloseModal}>Close</button>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingDetails;
