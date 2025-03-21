import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import styles from "../css/ProductSlider.module.css";
import laptop from "../assets/Laptop.jpg";
import { Link } from "react-router-dom";

const ProductSlider = ({ products }) => {
    return (
        <div className={styles.sliderContainer}>

            <div className={styles.sliderWrapper}>
                <div className={styles.sliderBanner}>
                    <h3>Products On Sale</h3>
                    <p>Shop Now!</p>
                </div>

                <Swiper
                    slidesPerView={4} 
                    breakpoints={{
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 15 },
                        640: { slidesPerView: 2, spaceBetween: 10 },
                        0: { slidesPerView: 1, spaceBetween: 5 }
                    }}
                    className={styles.productSlider}>

                    {products.map((product, index) => (
                        <SwiperSlide key={index}>
                            <Link to="/product/1">
                            <div className={styles.productCard}>
                                <span className={styles.discountBadge}>{product.discount}</span>
                                <img src={laptop} alt={product.name} />
                                <h4>{product.name}</h4>
                                <p className={styles.oldPrice}>${product.oldPrice}</p>
                                <p className={styles.newPrice}>${product.newPrice}</p>
                            </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductSlider;
