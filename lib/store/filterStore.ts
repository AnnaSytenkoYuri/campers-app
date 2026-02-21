import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterProps {
//   favorites: any;
//   toggleFavorite: any;
  filters: string[];
  toggleFilter: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  form: string;
  setForm: (value: string) => void;
  transmission: string;
  setTransmission: (value: string) => void;
  activeFilters: {
    location: string;
    equipment: string[];
    form: string;
    transmission: string;
  };
  applyFilters: () => void;
  _hasHydrated: boolean;
  setHasHydrated: () => void;
}

const useFilterStore = create<FilterProps>()(
  persist(
    set => ({
      filters: [],
      location: '',
      form: '',
      transmission: '',
      activeFilters: {
        location: '',
        equipment: [],
        form: '',
        transmission: '',
      },
      _hasHydrated: false,
      setHasHydrated: () => set({ _hasHydrated: true }),
      toggleFilter: value =>
        set(state => ({
          filters: state.filters.includes(value)
            ? state.filters.filter(item => item !== value)
            : [...state.filters, value],
        })),
      setLocation: value => set({ location: value }),
      setForm: value =>
        set(state => ({
          form: state.form === value ? '' : value,
        })),
      setTransmission: value =>
        set(state => ({
          transmission: state.transmission === value ? '' : value,
        })),
      applyFilters: () =>
        set(state => ({
          activeFilters: {
            location: state.location,
            equipment: state.filters,
            form: state.form,
            transmission: state.transmission,
          },
        })),
    }),
    {
      name: 'filter-storage',
      onRehydrateStorage: () => state => {
        state?.setHasHydrated();
      },
      partialize: state => ({
        filters: state.filters,
        form: state.form,
        transmission: state.transmission,
        location: state.location,
        activeFilters: state.activeFilters,
      }),
    }
  )
);

export default useFilterStore;