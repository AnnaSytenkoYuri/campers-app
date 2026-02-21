'use client';

import useFavoritesStore from '@/lib/store/favoriteStore';
import HeartIcon from './HeartIcon';
import css from './HeartIcon.module.css';
type HeartButtonProps = {
  id: string;
};

export default function HeartButton({ id }: HeartButtonProps){
  

  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite);
  const favorites = useFavoritesStore(s => s.favorites);
  const hasHydrated = useFavoritesStore((state) => state._hasHydrated);

  if (!hasHydrated) return null;


  const active = favorites.includes(id);

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

