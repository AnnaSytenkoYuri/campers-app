import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: id =>
        set({
          favorites: [...get().favorites, id],
        }),
      toggleFavorite: id =>
        set({
          favorites: get().favorites.includes(id)
            ? get().favorites.filter(favId => favId !== id)
            : [...get().favorites, id],
        }),
      _hasHydrated: false,
      setHasHydrated: state => set({ _hasHydrated: state }),
    }),
    {
      name: 'favorites-storage',
    }
  )
);

export default useFavoritesStore;
