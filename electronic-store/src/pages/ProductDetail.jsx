import React, { useEffect, useState } from "react";
import TechnicalDetails from "../components/ProductDetail/TechnicalDetails";
import AddToCart from "../components/ProductDetail/AddToCart";
import "../css/ProductDetail.css";
import BasicProductDetails from "../components/ProductDetail/BasicProductDetails";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import RatingComment from "../components/ProductDetail/CommentAndRating";
import DisplayComment from "../components/ProductDetail/DisplayComment";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                const productResponse = await fetch(`http://localhost:3000/products/${id}`);
                const productData = await productResponse.json();

                const reviewsResponse = await fetch(`http://localhost:3000/review?productId=${id}`);
                const reviewsData = await reviewsResponse.json();

                setProduct(productData);
                setReviews(reviewsData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data:", error.message);
                setLoading(false);
            }
        };

        fetchProductAndReviews();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <>
            <Breadcrumb />
            <div className="BPD">
                <div>
                    <BasicProductDetails product={product} />
                    <TechnicalDetails attributes={product.attributes} />
                </div>
                <div>
                    <AddToCart product={product} />
                </div>
            </div>
            <div className="BPD-Comment">
                <RatingComment productId={id} setReviews={setReviews} />
                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <DisplayComment key={review.id} review={review} />
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
