import { Camper } from "@/lib/types/camper";
import css from "./CamperFeatures.module.css";

interface CamperFeaturesProps {
  camper: Camper;
}

export default function CamperFeatures({ camper }: CamperFeaturesProps) {
  const features: string[] = [];

  if (camper.transmission) features.push(camper.transmission);
  if (camper.engine) features.push(camper.engine);
  if (camper.AC) features.push("AC");
  if (camper.kitchen) features.push("Kitchen");
  if (camper.TV) features.push("TV");
  if (camper.bathroom) features.push("Bathroom");
  if (camper.radio) features.push("Radio");
  if (camper.refrigerator) features.push("Refrigerator");
  if (camper.microwave) features.push("Microwave");
  if (camper.gas) features.push("Gas");
  if (camper.water) features.push("Water");

  return (
    <div className={css.features}>
      {features.length > 0 && (
        <ul className={css.featureList}>
          {features.map((feature, i) => (
            <li key={i} className={css.featureItem}>
              {feature}
            </li>
          ))}
        </ul>
      )}

      <h2 className={css.title}>Vehicle Details</h2>
      <ul className={css.detailsList}>
        {camper.form && (
          <li>
            <span className={css.detailName}>Form:</span>{" "}
            <span className={css.detailValue}>{camper.form}</span>
          </li>
        )}
        {camper.length && (
          <li>
            <span className={css.detailName}>Length:</span>{" "}
            <span className={css.detailValue}>{camper.length}</span>
          </li>
        )}
        {camper.width && (
          <li>
            <span className={css.detailName}>Width:</span>{" "}
            <span className={css.detailValue}>{camper.width}</span>
          </li>
        )}
        {camper.height && (
          <li>
            <span className={css.detailName}>Height:</span>{" "}
            <span className={css.detailValue}>{camper.height}</span>
          </li>
        )}
        {camper.tank && (
          <li>
            <span className={css.detailName}>Tank:</span>{" "}
            <span className={css.detailValue}>{camper.tank}</span>
          </li>
        )}
        {camper.consumption && (
          <li>
            <span className={css.detailName}>Consumption:</span>{" "}
            <span className={css.detailValue}>{camper.consumption}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
