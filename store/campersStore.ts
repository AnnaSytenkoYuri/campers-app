import { create } from "zustand";
import { Camper } from "@/lib/types/camper";
import { getCampers } from "@/lib/api/campersApi";

interface Filters {
  location?: string;
  form?: string;
  transmission?: string;
  AC?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  bathroom?: boolean;
}
interface CampersState {
  campers: Camper[];
  filters: Filters;
  page: number;
  isLoading: boolean;
  error: string | null;
  total: number;

  favorites: string[];
  toggleFavorite: (id: string) => void;

  setFilters: (filters: Filters) => void;
  fetchCampers: (reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  resetCampers: () => void;
  resetFilters: () => void;
}

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  filters: {},
  page: 1,
  total: 0,
  isLoading: false,
  error: null,
  favorites:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : [],

  toggleFavorite: (id) =>
    set((state) => {
      const updated = state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),

  setFilters: (filters) =>
    set({
      filters,
      page: 1,
    }),

  resetFilters: () =>
    set({
      filters: {},
      campers: [],
      page: 1,
    }),

  resetCampers: () =>
    set({
      campers: [],
      page: 1,
    }),

  fetchCampers: async (reset = false) => {
    const { filters, page } = get();
    const { location, form, transmission, AC, kitchen, TV, bathroom } = filters;

    set({ isLoading: true, error: null });

    try {
      const params = {
        page: reset ? 1 : page,
        limit: 8,

        ...(location ? { location } : {}),
        ...(form ? { form } : {}),
        ...(transmission ? { transmission } : {}),
        ...(AC ? { AC: true } : {}),
        ...(kitchen ? { kitchen: true } : {}),
        ...(TV ? { TV: true } : {}),
        ...(bathroom ? { bathroom: true } : {}),
      };

      const response = await getCampers(params);

      const items = Array.isArray(response) ? response : response.items;

      const total = Array.isArray(response) ? response.length : response.total;

      set((state) => ({
        campers: reset ? items : [...state.campers, ...items],
        total,
        isLoading: false,
      }));
    } catch {
      set({
        error: "Failed to fetch campers",
        isLoading: false,
      });
    }
  },

  loadMore: async () => {
    const nextPage = get().page + 1;
    set({ page: nextPage });
    await get().fetchCampers(false);
  },
}));
