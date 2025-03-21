import React, { useState } from "react";
import "../css/SearchBox.css";

const SearchBox = ({ suggestions = [], products = [], onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="search-box">
            {/* Thanh tìm kiếm + nút Exit */}
            <div className="search-header">
                <input
                    type="text"
                    placeholder="Search for a product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="exit-btn" onClick={onClose}>✖</button>
            </div>

            <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                View {products.length} results
            </p>

            {/* Kết quả tìm kiếm */}
            <div className="results">
                <div className="left-results">
                    {suggestions.length > 0 ? (
                        suggestions.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    ) : (
                        <p>No suggestions found.</p>
                    )}
                    <p className="view-more">View more</p>
                </div>

                <div className="right-results">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index} className="product-item">
                                <img src={product.image} alt={product.name} />
                                <p>{product.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
