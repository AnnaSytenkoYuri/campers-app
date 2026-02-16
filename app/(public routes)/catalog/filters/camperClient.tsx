'use client';

import { useEffect, useMemo, useState } from 'react';
import css from './CampersClient.module.css';
import useFilterStore from '@/store/filterStore';
import useCamperStore from '@/store/campersStore';
import { getCampers } from '@/lib/api/campersApi';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/Loader/Loader';
import ButtonComponent from '@/components/Button/Button';



export default function CampersClient() {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const activeFilters = useFilterStore(s => s.activeFilters);
  const _hasHydrated = useFilterStore(s => s._hasHydrated);

  const { campers, currentPage, hasMore, setCampers, addCampers, setHasMore } =
    useCamperStore();

  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!_hasHydrated) return;

    setIsEmpty(false);

    getCampers(1, activeFilters)
      .then(res => {
        setCampers(res.items);
        setHasMore(res.items.length === 4);
      })
      .catch(() => {
        setIsEmpty(true);
        setHasMore(false);
      });
  }, [_hasHydrated, activeFilters, setCampers, setHasMore]);

  const filteredCampers = useMemo(() => {
    return campers.filter((c) => {
      if (activeFilters.location) {
        const ok = (c.location ?? '')
          .toLowerCase()
          .includes(activeFilters.location.toLowerCase());
        if (!ok) return false;
      }

      if (activeFilters.transmission) {
        if (c.transmission !== activeFilters.transmission) return false;
      }

      if (activeFilters.form) {
        if (c.form !== activeFilters.form) return false;
      }

      if (activeFilters.equipment?.length) {
        const okAll = activeFilters.equipment.every((k: string) =>
          c && Boolean(c[k as keyof typeof c])
        );
        if (!okAll) return false;
      }

      return true;
    });
  }, [campers, activeFilters]);

  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);

      const nextPage = currentPage + 1;
      const res = await getCampers(nextPage, activeFilters);

      addCampers(res.items);
      setHasMore(res.items.length === 4);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <section className={css.clientPageContainer}>
      {isEmpty || filteredCampers.length === 0 ? (
        <div className={css.noFound}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#101828"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
          <h3 className={css.noFoundTitle}>No Campers Found</h3>
          <p className={css.noFoundText}>
            No results found for the selected filters.
          </p>
        </div>
      ) : (
        <div className={css.campersContainer}>
          {filteredCampers.map((camper) => (
            <CamperCard key={camper.id ?? camper.id} camper={camper} />
          ))}
        </div>
      )}

      {hasMore &&
        (isLoadingMore ? (
          <Loader />
        ) : (
          <ButtonComponent
            className="button button--secondary"
            onClick={handleLoadMore}
          >
            Load more
          </ButtonComponent>
        ))}
    </section>
  );
}