'use client';

import css from './CamperFeatures.module.css';
import Icon from '../Icon/Icon';
import { Camper } from '@/types/camper';
import { buildFeature } from '@/constants/features';

interface FeaturesProps {
  camper: Camper;
}

export default function CamperFeatures({ camper }: FeaturesProps){
  const features = buildFeature(camper);

  const camperForm = {
    panelTruck: 'Panel truck',
    FullyIntegrated: 'Fully integrated',
    Alcove: 'Alcove',
  };

  return (
    <div className={css.container}>
      <ul className={css.optionsContainer}>
        {features.map(({ key, label, icon, iconType }) => (
          <li key={key} className={css.optionItem}>
            <Icon
              name={icon}
              size={20}
              className={`${css.optionIcon} ${
                iconType === 'stroke'
                  ? css.optionIconStroke
                  : css.optionIconFill
              }`}
            />
            <p className={css.labelText}>{label}</p>
          </li>
        ))}
      </ul>
      <div className={css.specsFeatures}>
        <h3 className={css.title}>Vehicle details</h3>
        <hr className={css.stroke} />
        <div className={css.specs}>
          <p className={css.spec}>
            <span>Form:</span>{' '}
            {camperForm[camper.form as keyof typeof camperForm]}
          </p>
          <p className={css.spec}>
            <span>Length:</span> {camper.length}
          </p>
          <p className={css.spec}>
            <span>Width:</span> {camper.width}
          </p>
          <p className={css.spec}>
            <span>Height:</span> {camper.height}
          </p>
          <p className={css.spec}>
            <span>Tank:</span> {camper.tank}
          </p>
          <p className={css.spec}>
            <span>Consumption:</span> {camper.consumption}
          </p>
        </div>
      </div>
    </div>
  );
};

