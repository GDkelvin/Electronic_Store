import React, { useState } from "react";
import "../../css/ProductFilter.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ProductFilter = ({ onPriceChange, onBrandChange }) => {
    const default_min_price = 0;
    const default_max_price = 10000;
    const [minPrice, setMinPrice] = useState(default_min_price);
    const [maxPrice, setMaxPrice] = useState(default_max_price);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleMinChange = (e) => {
        let value = Number(e.target.value);
        if (value < default_min_price) value = default_min_price;
        if (value > maxPrice - 10) value = maxPrice - 10; 
        setMinPrice(value);
        onPriceChange({ min: value, max: maxPrice });
    };

    const handleMaxChange = (e) => {
        let value = Number(e.target.value);
        if (value > default_max_price) value = default_max_price; 
        if (value < minPrice + 10) value = minPrice + 10; 
        setMaxPrice(value);
        onPriceChange({ min: minPrice, max: value });
    };

    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        let updatedBrands = checked
            ? [...selectedBrands, value]
            : selectedBrands.filter((brand) => brand !== value);
        setSelectedBrands(updatedBrands);
        onBrandChange(updatedBrands); 
    };

    const handleClearAll = () => {
        setMinPrice(default_min_price);
        setMaxPrice(default_max_price);
        setSelectedBrands([]);
        onPriceChange({ min: default_min_price, max: default_max_price });
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
                <p>Brand</p>
                <div className="filter-content">
                    {['Asus', 'Acer', 'Apple', 'Dell', 'Samsung'].map((brand) => (
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
                <p>Price </p>
                <div className="price-input">
                    <input type="number" value={minPrice} onChange={handleMinChange} />
                    <input type="number" value={maxPrice} onChange={handleMaxChange} />
                </div>
                <div className="price-slider">
                    <div className="slider-track" style={{
                        left: `${(minPrice / default_max_price) * 100}%`,
                        right: `${100 - (maxPrice / default_max_price) * 100}%`
                    }}></div>
                    <input type="range" min={default_min_price} max={default_max_price} value={minPrice} onChange={handleMinChange} />
                    <input type="range" min={default_min_price} max={default_max_price} value={maxPrice} onChange={handleMaxChange} />
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
