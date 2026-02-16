import { Camper } from "@/lib/types/camper";
import Image from "next/image";
import css from "./CamperCard.module.css";
// import { buildFeature } from "@/constants/features";
// import CamperCardButton from "./CamperCartButton/CamperCartButton";
// import HeartButton from "./HeartIcon/HeartButton";
// import Icon from "../Icon/Icon";


interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const imgSrc = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original || '/images/placeholder.jpg';
  // const feature = buildFeature(camper);
    
  return ( 
    // <div className={css.cardContainer}>
    <>
      <Image
        src={imgSrc}
        alt={camper.name}
        width={280}
        height={320}
        className={css.image}
        />
        </>
    //   <div className={css.infoContainer}>
    //     <div className={css.titleContainer}>
    //       <h2 className={css.titleText}>{camper.name}</h2>
    //       <div className={css.priceContainer}>
    //         <p className={css.titleText}>{camper.price.toFixed(2)}</p>
    //         <HeartButton id={camper.id} />
    //       </div>
    //     </div>
    //     <div className={css.reviewsContainer}>
    //       <div className={css.rewTextContainer}>
    //         <svg
    //           className={css.starIcon}
    //           width="16"
    //           height="16"
    //           aria-hidden="true"
    //         >
    //           <use href="/sprite.svg#star"></use>
    //         </svg>
    //         <p className={css.revText}>
    //           {camper.rating}({camper.reviews.length} Reviews)
    //         </p>
    //       </div>
    //       <div className={css.rewTextContainer}>
    //         <svg
    //           className={css.mapIcon}
    //           width="16"
    //           height="16"
    //           aria-hidden="true"
    //         >
    //           <use href="/sprite.svg#map"></use>
    //         </svg>
    //         <p className={css.revText}>{camper.location}</p>
    //       </div>
    //     </div>
    //     <p className={css.description}>{camper.description}</p>
    //     <ul className={css.optionsContainer}>
    //       {feature.map(({ key, label, icon, iconType }) => (
    //         <li key={key} className={css.optionItem}>
    //           <Icon
    //             name={icon}
    //             size={20}
    //             className={`${css.optionIcon} ${
    //               iconType === 'stroke'
    //                 ? css.optionIconStroke
    //                 : css.optionIconFill
    //             }`}
    //           />
    //           <p className={css.labelText}>{label}</p>
    //         </li>
    //       ))}
    //     </ul>
    //     <div className={css.btnContainer}>
    //       <CamperCardButton id={camper.id} />
    //     </div>
    //   </div>
    // </div>
  );

}
