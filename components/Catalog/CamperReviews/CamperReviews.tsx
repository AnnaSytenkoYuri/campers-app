"use client";

import React from "react";
import css from "./CamperReviews.module.css";

export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

interface CamperReviewsProps {
  review: Review;
}

export default function CamperReviews({ review }: CamperReviewsProps) {
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <ul className={css.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={css.reviewCard}>
          <div className={css.header}>
            <strong>{review.user}</strong>
            <span className={css.rating}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < review.rating ? css.filledStar : css.emptyStar}>
                  ★
                </span>
              ))}
            </span>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}