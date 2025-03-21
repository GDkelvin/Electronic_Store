import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import styles from "../css/ProductSlider.module.css";
import laptopImg from "../assets/Laptop.jpg";

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
          spaceBetween={20}
          breakpoints={{
            1024: { slidesPerView: 4, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 5 },
          }}
          navigation
          className={styles.productSlider}
        >
          {products.length === 0 ? (
            <h3>No products available</h3>
          ) : (
            products.map((product, index) => (
              <SwiperSlide key={product.id || index}>
                <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className={styles.productCard}>
                    <span className={styles.discountBadge}>{product.discount}</span>
                    <img src={laptopImg} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p className={styles.oldPrice}>${product.price}</p>
                    <p className={styles.newPrice}>${product.price}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
