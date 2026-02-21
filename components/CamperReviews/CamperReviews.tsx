'use client';
import css from './CamperReviews.module.css';
import { Review } from '@/types/camper';


interface CamperReviewsProps {
  review: Review; 
}

export default function CamperReviews({ review }: CamperReviewsProps) {
  const firstLetter = review.reviewer_name.charAt(0).toUpperCase();
  const rating = review.reviewer_rating;

  return (
    <div className={css.reviewCard}>
      <div className={css.reviewerInfo}>
        <h2 className={css.reviewerImage}>{firstLetter}</h2>
        <div className={css.reviewerDetails}>
          <p className={css.name}>{review.reviewer_name}</p>
          <div className={css.rating}>
            {[1, 2, 3, 4, 5].map(star => (
              <svg
                key={star}
                width={16}
                height={16}
                viewBox="0 0 16 16"
                className={
                  star <= rating ? css.ratingIcon : css.ratingIconNeutral
                }
              >
                <use href="/sprite.svg#star" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className={css.text}>{review.comment}</p>
    </div>
  );
}
