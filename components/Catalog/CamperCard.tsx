"use client";
import { Camper } from "@/lib/types/camper";
import { useFavoritesStore } from "@/store/favoritesStore";
import Image from "next/image";
import css from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(camper.id);
  return (
    <li className={css.card}>
      <Image
      className={css.image}
        src={camper.image?.[0] || "/images/placeholder.jpg"}
        alt={camper.name}
        width={292}
        height={320}
      />
      <div className={css.contant}>
        <div className={css.header}>
          <div className={css.headerWrapper}>
            <h3 className={css.title}>{camper.name}</h3>
            <div className={css.priceWrap}>
              <span className={css.price}>{camper.price}</span>
              <button onClick={() => toggleFavorite(camper.id)}>
                {isFavorite ? (
                  <svg
                    width="24"
                    height="21"
                    viewBox="0 0 24 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 7.854L10.659 5.1705C10.326 4.506 9.7485 3.5505 8.931 2.778C8.127 2.0175 7.164 1.5 6 1.5C3.486 1.5 1.5 3.489 1.5 5.88C1.5 7.6965 2.331 8.979 4.302 10.935C4.8075 11.436 5.3835 11.9775 6.021 12.5745C7.683 14.1345 9.75 16.0755 12 18.6705C14.25 16.0755 16.317 14.1345 17.979 12.5745C18.6165 11.9775 19.194 11.4345 19.698 10.935C21.669 8.979 22.5 7.6965 22.5 5.88C22.5 3.489 20.514 1.5 18 1.5C16.8345 1.5 15.873 2.0175 15.069 2.778C14.2515 3.5505 13.674 4.506 13.341 5.1705L12 7.854ZM12.588 20.292C12.5158 20.3776 12.4257 20.4463 12.3242 20.4935C12.2226 20.5407 12.112 20.5651 12 20.5651C11.888 20.5651 11.7774 20.5407 11.6758 20.4935C11.5743 20.4463 11.4842 20.3776 11.412 20.292C9.0105 17.439 6.837 15.399 5.0475 13.7205C1.95 10.812 0 8.9835 0 5.88C0 2.6325 2.685 0 6 0C8.4 0 10.0785 1.575 11.106 3.012C11.496 3.5595 11.793 4.086 12 4.5C12.2597 3.982 12.5586 3.48456 12.894 3.012C13.9215 1.5735 15.6 0 18 0C21.315 0 24 2.6325 24 5.88C24 8.9835 22.05 10.812 18.9525 13.7205C17.163 15.4005 14.9895 17.442 12.588 20.292Z"
                      fill="#E44848"
                    />
                  </svg>
                ) : (
                  <svg
                    width="26"
                    height="24"
                    viewBox="0 0 26 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 9.854L11.659 7.1705C11.326 6.506 10.7485 5.5505 9.931 4.778C9.127 4.0175 8.164 3.5 7 3.5C4.486 3.5 2.5 5.489 2.5 7.88C2.5 9.6965 3.331 10.979 5.302 12.935C5.8075 13.436 6.3835 13.9775 7.021 14.5745C8.683 16.1345 10.75 18.0755 13 20.6705C15.25 18.0755 17.317 16.1345 18.979 14.5745C19.6165 13.9775 20.194 13.4345 20.698 12.935C22.669 10.979 23.5 9.6965 23.5 7.88C23.5 5.489 21.514 3.5 19 3.5C17.8345 3.5 16.873 4.0175 16.069 4.778C15.2515 5.5505 14.674 6.506 14.341 7.1705L13 9.854ZM13.588 22.292C13.5158 22.3776 13.4257 22.4463 13.3242 22.4935C13.2226 22.5407 13.112 22.5651 13 22.5651C12.888 22.5651 12.7774 22.5407 12.6758 22.4935C12.5743 22.4463 12.4842 22.3776 12.412 22.292C10.0105 19.439 7.837 17.399 6.0475 15.7205C2.95 12.812 1 10.9835 1 7.88C1 4.6325 3.685 2 7 2C9.4 2 11.0785 3.575 12.106 5.012C12.496 5.5595 12.793 6.086 13 6.5C13.2597 5.982 13.5586 5.48456 13.894 5.012C14.9215 3.5735 16.6 2 19 2C22.315 2 25 4.6325 25 7.88C25 10.9835 23.05 12.812 19.9525 15.7205C18.163 17.4005 15.9895 19.442 13.588 22.292Z"
                      fill="#101828"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={css.meta}>
            {/* <span className={css.rating}>
              ⭐ {camper.rating} ({camper.reviews} Reviews)
            </span> */}
            <span className={css.dot}>•</span>
            <span className={css.location}>{camper.location}</span>
          </div>

          <p className={css.description}>{camper.transmission}</p>

          <ul className={css.features}>{camper.engine}</ul>

          <button className={css.moreBtn}>Show more</button>
        </div>
      </div>
    </li>
  );
}
