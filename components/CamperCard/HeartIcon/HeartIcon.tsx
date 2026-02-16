'use client';

import css from './HeartIcon.module.css';

type Props = {
  active: boolean;
};

const HeartIcon = ({ active }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      className={`${css.heart} ${active ? css.active : ''}`}
      aria-hidden
    >
      <use href="/sprite.svg#heart"></use>
    </svg>
  );
};

export default HeartIcon;