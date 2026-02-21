'use client';

import css from './page.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import BookingForm from '@/components/BookingForm/BookingForm';
import { Camper } from '@/types/camper';
import { getCamperById } from '@/lib/api/campersApi';
import CamperFeatures from '@/components/CamperFeatures/CamperFeatures';
import CamperReviews from '@/components/CamperReviews/CamperReviews';
import Loader from '@/components/Loader/Loader';

type Props = {
  id: string;
};

const CamperPage = ({ id }: Props) => {
  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFeaturesSelected, setIsFeaturesSelected] = useState(true);
  const [isReviewsSelected, setIsReviewsSelected] = useState(false);

  useEffect(() => {
    getCamperById(Number(id))
      .then(data => {
        setCamper(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const avgRating = (camper: Camper) => {
    const total = camper.reviews.reduce(
      (sum, review) => sum + review.reviewer_rating,
      0
    );
    return (total / camper.reviews.length).toFixed(1);
  };

  const handleFeaturesClick = () => {
    if (isFeaturesSelected) return;
    setIsFeaturesSelected(true);
    setIsReviewsSelected(false);
  };

  const handleReviewsClick = () => {
    if (isReviewsSelected) return;
    setIsFeaturesSelected(false);
    setIsReviewsSelected(true);
  };

  if (isLoading) return <Loader />;
  if (!camper) return null;

  return (
    <section className={css.pageSection}>
      <div className="container">
        <div className={css.container}>
          <div className={css.top}>
            <div className={css.head}>
              <h2 className={css.title}>{camper.name}</h2>

              <div className={css.numbers}>
                <div className={css.numbersWrapper}>
                  <p className={css.numberInfo}>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      className={css.ratingIcon}
                    >
                      <use href="/sprite.svg#star" />
                    </svg>

                    <u>
                      {avgRating(camper)}({camper.reviews.length} reviews)
                    </u>
                  </p>

                  <p className={css.numberInfo}>
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      className={css.locationIcon}
                    >
                      <use href="/sprite.svg#map" />
                    </svg>
                    {camper.location}
                  </p>
                </div>

                <h2 className={css.price}>&euro;{camper.price}.00</h2>
              </div>
            </div>

            <div className={css.images}>
              {camper.gallery.map((image, index) => (
                <div key={index} className={css.imageContainer}>
                  <Image
                    src={image.original}
                    alt={camper.name}
                    className={css.image}
                    width={292}
                    height={312}
                  />
                </div>
              ))}
            </div>

            <p className={css.text}>{camper.description}</p>
          </div>

          <div className={css.bottom}>
            <div className={css.tabs}>
              <h3
                className={`${css.features} ${isFeaturesSelected ? css.active : ''}`}
                onClick={handleFeaturesClick}
              >
                Features
              </h3>

              <h3
                className={`${css.reviews} ${isReviewsSelected ? css.active : ''}`}
                onClick={handleReviewsClick}
              >
                Reviews
              </h3>
            </div>

            <div className={css.details}>
              {isFeaturesSelected && <CamperFeatures camper={camper} />}

              {isReviewsSelected && (
                <div className={css.reviewsWrapper}>
                  {camper.reviews.map((review, index) => (
                    <CamperReviews key={index} review={review} />
                  ))}
                </div>
              )}

              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CamperPage;
