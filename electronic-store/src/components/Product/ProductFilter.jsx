import React, { useState } from "react";
import "../../css/ProductFilter.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProductFilter = () => {
    const [showBrand, setShowBrand] = useState(true);
    const [showPrice, setShowPrice] = useState(true);
    const [showRam, setShowRam] = useState(true);
    const [showProcessor, setShowProcessor] = useState(true);

    return (
        <div className="filter-container">
            <div className="filter-header">
                <p>Filters</p>
                <button>Clear all</button>
            </div>
            {/* brand */}
            <div className="brand-filter">
                <p onClick={() => setShowBrand(!showBrand)} >
                    Brand <i className={`bi ${showBrand ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </p>
                {showBrand && (
                    <div className="filter-content">
                        <label><input type="checkbox" /> Asus</label>
                        <label><input type="checkbox" /> Acer</label>
                        <label><input type="checkbox" /> Apple</label>
                        <label><input type="checkbox" /> Dell</label>
                    </div>
                )}
            </div>

            <hr />
            {/* Price */}
            <div className="Price-filter">
                <p onClick={() => setShowPrice(!showPrice)} className="filter-title">
                    Price <i className={`bi ${showPrice ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </p>
                {showPrice && (
                    <div className="filter-content">
                        <div className="price-input">
                            <input type="text" placeholder="min" />
                            <input type="text" placeholder="max" />
                        </div>
                        <div className="price-range">
                            <input type="range" min="0" max="3000" defaultValue="1500" />
                        </div>

                    </div>
                )}
            </div>

            {/* Ram */}
            <div className="ram-filter">
                <p onClick={() => setShowRam(!showRam)} >
                    RAM <i className={`bi ${showRam ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </p>
                {showRam && (
                    <div className="filter-content">
                        <label><input type="checkbox" /> 8GB</label>
                        <label><input type="checkbox" /> 16GB</label>
                        <label><input type="checkbox" /> 32GB</label>
                        <label><input type="checkbox" /> 64GB</label>
                    </div>
                )}
            </div>

            <hr style={{ margin: "20px 0px" }} />

            <div className="processor-filter">
                <p onClick={() => setShowProcessor(!showProcessor)} >
                    Processor <i className={`bi ${showProcessor ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                </p>
                {showProcessor && (
                    <div className="filter-content">
                        <label><input type="checkbox" /> Intel Core I3</label>
                        <label><input type="checkbox" /> Intel Core I5</label>
                        <label><input type="checkbox" /> Intel Core I7</label>
                        <label><input type="checkbox" /> Intel Core I9</label>
                        <label><input type="checkbox" /> AMD Ryzen 9</label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilter;
