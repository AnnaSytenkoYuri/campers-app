"use client";

import { useEffect } from "react";
import CampersList from "@/components/Catalog/CamperList/CampersList";
import { useCampersStore } from "@/store/campersStore";

export default function CatalogPage() {
  const campers = useCampersStore((state) => state.campers);
  const isLoading = useCampersStore((state) => state.isLoading);

  const fetchCampers = useCampersStore((state) => state.fetchCampers);
  const resetCampers = useCampersStore((state) => state.resetCampers);
  const setFilters = useCampersStore((state) => state.setFilters);
  const total = useCampersStore((state) => state.total);

  useEffect(() => {
    
    setFilters({});
    resetCampers();
    fetchCampers(true);
  }, [fetchCampers, resetCampers, setFilters]);

  return <CampersList campers={campers} isLoading={isLoading} total={total} />;
}