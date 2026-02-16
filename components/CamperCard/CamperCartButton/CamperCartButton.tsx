'use client';

import ButtonComponent from '@/components/Button/Button';
import { useRouter } from 'next/navigation';

interface CamperCardButtonPros {
  id: string;
}

const CamperCardButton = ({ id }: CamperCardButtonPros) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/catalog/${id}`);
  };
  return (
    <div>
      <ButtonComponent
        type="button"
        onClick={handleClick}
        className="button button--primary"
      >
        Show more
      </ButtonComponent>
    </div>
  );
};

export default CamperCardButton;