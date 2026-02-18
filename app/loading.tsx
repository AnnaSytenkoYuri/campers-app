import Loader from '@/components/Loader/Loader';
import css from './loading.module.css';
export default function LoadingIndicator() {
  return (
    <div className={css.backdrop}>
      <Loader />
    </div>
  );
}