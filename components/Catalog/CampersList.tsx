import { Camper } from "@/lib/types/camper";
import CamperCard from "./CamperCard";
import css from "./CampersList.module.css";

export default function CampersList({ campers }: { campers: Camper[] }) {
  console.log("CampersList campers:", campers);
  console.log("Is array:", Array.isArray(campers));
  return (
    <div>
    <ul className={css.list}>
      {Array.isArray(campers) && campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </ul>
    <button type="button" className={css.loadMoreBtn}>Load more</button>
    </div>
    
  );
}
