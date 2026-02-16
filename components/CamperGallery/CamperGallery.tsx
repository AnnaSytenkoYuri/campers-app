"use client";

import Image from "next/image";
import css from "./CamperGallery.module.css";

interface CamperGalleryProps {
  images: string[];
}

export default function CamperGallery({ images }: CamperGalleryProps) {
  if (!images.length) return <p>No images available</p>;

  return (
    <div className={css.gallery}>
      {images.map((src, i) => (
        <div key={i} className={css.imageWrapper}>
          <Image
            className={css.image}
            src={src}
            alt={`Camper image ${i + 1}`}
            width={400}
            height={300}
          />
        </div>
      ))}
    </div>
  );
}
