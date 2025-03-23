import React, { useState } from "react";
import "../../css/ProductFilter.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProductFilter = ({ onPriceChange, onBrandChange }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 10);
        setMinPrice(value);
        onPriceChange({ min: value, max: maxPrice });
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 10);
        setMaxPrice(value);
        onPriceChange({ min: minPrice, max: value });
    };

    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        let updatedBrands = checked
            ? [...selectedBrands, value]
            : selectedBrands.filter((brand) => brand !== value);
        setSelectedBrands(updatedBrands);
        onBrandChange(updatedBrands); // Pass the updated array correctly
    };

    const handleClearAll = () => {
        setMinPrice(0);
        setMaxPrice(3000);
        setSelectedBrands([]);
        onPriceChange({ min: 0, max: 3000 });
        onBrandChange([]);
    };

    return (
        <div className="filter-container">
            {/* Filter Header */}
            <div className="filter-header">
                <p>Filters</p>
                <button onClick={handleClearAll}>Clear all</button>
            </div>

            {/* Brand Filter */}
            <div className="brand-filter">
                <p>Brand <i className="bi bi-chevron-down"></i></p>
                <div className="filter-content">
                    {['Asus', 'Acer', 'Apple', 'Dell'].map((brand) => (
                        <label key={brand}>
                            <input
                                type="checkbox"
                                value={brand}
                                checked={selectedBrands.includes(brand)}
                                onChange={handleBrandChange}
                            /> {brand}
                        </label>
                    ))}
                </div>
            </div>

            <hr />

            {/* Price Filter */}
            <div className="Price-filter">
                <p>Price <i className="bi bi-chevron-down"></i></p>
                <div className="price-input">
                    <input type="number" value={minPrice} onChange={handleMinChange} />
                    <input type="number" value={maxPrice} onChange={handleMaxChange} />
                </div>
                <div className="price-slider">
                    <div className="slider-track" style={{
                        left: `${(minPrice / 3000) * 100}%`,
                        right: `${100 - (maxPrice / 3000) * 100}%`
                    }}></div>
                    <input type="range" min="0" max="3000" value={minPrice} onChange={handleMinChange} />
                    <input type="range" min="0" max="3000" value={maxPrice} onChange={handleMaxChange} />
                </div>
            </div>

            <hr />

            {/* RAM Filter */}
            {/* <div className="ram-filter">
                <p>RAM <i className="bi bi-chevron-down"></i></p>
                <div className="filter-content">
                    <label><input type="checkbox" /> 8GB</label>
                    <label><input type="checkbox" /> 16GB</label>
                    <label><input type="checkbox" /> 32GB</label>
                    <label><input type="checkbox" /> 64GB</label>
                </div>
            </div> */}
        </div>
    );
};

export default ProductFilter;
