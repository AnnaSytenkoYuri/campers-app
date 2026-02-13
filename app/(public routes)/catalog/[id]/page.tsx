import type { Metadata } from 'next';
import CamperPage from './CamperPage';
import { getCamperById } from '@/lib/api/campersApi';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const idNum = Number(id);
  if (Number.isNaN(idNum)) {
    return {
      title: 'Camper not found | TravelTrucks',
      description: 'Invalid camper id.',
    };
  }

  const camper = await getCamperById(idNum);

  if (!camper) {
    return {
      title: 'Camper not found | TravelTrucks',
      description: 'Requested camper does not exist.',
    };
  }

  const desc = (camper.description ?? '').trim();

  return {
    title: `${camper.name} | TravelTrucks`,
    description: desc ? desc.slice(0, 160) : 'Camper details and booking.',
    openGraph: {
      title: `${camper.name} | TravelTrucks`,
      description: desc || 'Camper details and booking.',
      url: `https://campers-wine-phi.vercel.app/catalog/${id}`,
      siteName: 'TravelTrucks',
      type: 'website',
      images: camper.gallery?.[0]?.original
        ? [
            {
              url: camper.gallery[0].original,
              width: 1200,
              height: 630,
              alt: camper.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <CamperPage id={id} />;
}
