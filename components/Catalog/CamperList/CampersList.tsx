import { Camper } from '@/lib/types/camper';
import CamperCard from '../CamperCard/CamperCard';
import css from './CampersList.module.css';
import { useCampersStore } from '@/store/campersStore';

interface Props {
  campers: Camper[];
  isLoading: boolean;
  total: number;
}

export default function CampersList({ campers, isLoading, total }: Props) {
  const loadMore = useCampersStore(state => state.loadMore);

  return (
    <div>
      <ul className={css.list}>
        {campers.map(camper => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}

      {!isLoading && campers.length < total && (
        <button type="button" onClick={loadMore} className={css.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
