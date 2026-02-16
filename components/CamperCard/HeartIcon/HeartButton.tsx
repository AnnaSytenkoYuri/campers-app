'use client';

import useFavoritesStore from '@/store/favoriteStore';
import HeartIcon from './HeartIcon';
import css from './HeartIcon.module.css';
import { useEffect, useState } from 'react';
type HeartButtonProps = {
  id: string;
};

export default function HeartButton({ id }: HeartButtonProps){
  const [hydrated ] = useState(false);

  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite);
  const favorites = useFavoritesStore(s => s.favorites);

  useEffect(() => {
    // setHydrated(true);
  }, []);

  const active = hydrated ? favorites.includes(id) : false;

  const handleClick = () => {
    toggleFavorite(id);
    console.log(id);
  };
  return (
    <button
      className={css.heartBtn}
      type="button"
      onClick={handleClick}
      aria-label="Add to favorites"
    >
      <HeartIcon active={active} />
    </button>
  );
};

