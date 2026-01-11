"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCamperById } from "@/lib/api/campersApi";
import CamperFeatures from "@/components/Catalog/CamperFeatures/CamperFeatures";
import CamperReviews from "@/components/Catalog/CamperReviews/CamperReviews";
import BookingForm from "@/components/Catalog/BookingForm/BookingForm";
import css from "./page.module.css";

import { Camper } from "@/lib/types/camper";
import CamperGallery from "@/components/Catalog/CamperGallery/CamperGallery";

export default function CamperPage() {
  const { id } = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [activeTab, setActiveTab] = useState<"Features" | "Reviews">(
    "Features"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCamper() {
      if (!id || Array.isArray(id)) return;

      setIsLoading(true);
      try {
        const data = await getCamperById(id);
        setCamper(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCamper();
  }, [id]);

  if (isLoading) return <p>Loading camper...</p>;
  if (!camper) return <p>Camper not found</p>;

  return (
    <section>
      <h1 className={css.title}>{camper.name}/</h1>
      <div className={css.meta}>
        <span className={css.rating}>
          ⭐ {camper.rating.toFixed(1)} ({camper.reviews?.length ?? 0} Reviews)
        </span>
        <span className={css.dot}>•</span>
        <span className={css.location}>{camper.location}</span>
      </div>
      <div className={css.priceWrap}>
        <span className={css.price}>${camper.price.toFixed(2)}</span>
      </div>

      <CamperGallery
        images={camper.gallery?.map((img) => img.original) || []}
      />

      <p className={css.description}>{camper.description}</p>

      <div className={css.tabs}>
        <button
          className={`${css.tabButton} ${
            activeTab === "Features" ? css.active : ""
          }`}
          onClick={() => setActiveTab("Features")}
        >
          Features
        </button>
        <button
          className={`${css.tabButton} ${
            activeTab === "Reviews" ? css.active : ""
          }`}
          onClick={() => setActiveTab("Reviews")}
        >
          Reviews
        </button>
      </div>
      <div className={css.infoSections}>
        {activeTab === "Features" && <CamperFeatures camper={camper} />}
        {activeTab === "Reviews" && (
          <CamperReviews
            reviews={(camper.reviews || []).map((review, index) => ({
              id: review.reviewer_name + index, 
              user: review.reviewer_name,
              rating: Math.round(review.reviewer_rating),
              comment: review.comment,
            }))}
          />
        )}

        <BookingForm camperId={camper.id} />
      </div>
    </section>
  );
}
