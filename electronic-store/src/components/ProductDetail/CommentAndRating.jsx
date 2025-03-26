import React, { useState } from "react";
import styles from "../../css/CommentAndRating.module.css";

const RatingComment = ({ productId, setReviews }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating) {
            alert("Please select a rating before submitting.");
            return;
        }

        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("You must be logged in to submit a review.");
            return;
        }

        const user = JSON.parse(storedUser);
        const userId = user?.id;
        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }

        const reviewData = {
            userId,
            productId,
            rating,
            comment,
        };

        try {
            const response = await fetch("http://localhost:3000/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review.");
            }

            const newReview = await response.json();
            setReviews((prevReviews) => [newReview.review, ...prevReviews]);

            setRating(0);
            setComment("");
            window.location.reload(); 
        } catch (error) {
            console.error("Error submitting review:", error.message);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className={styles["rating-container"]}>
            <h3>Leave a Review</h3>
            <div className={styles["stars"]}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`${styles.star} ${star <= rating ? styles.selected : ""}`}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
            />
            <button onClick={handleSubmit} className={styles["Submit-comment"]}>
                Submit
            </button>
        </div>
    );
};

export default RatingComment;
