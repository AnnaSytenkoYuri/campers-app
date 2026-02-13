import { Metadata } from 'next';
import CampersClient from './camperClient';

export const metadata: Metadata = {
  title: 'Campers Catalog | TravelTrucks',
  description:
    'Discover the perfect camper for your next adventure. Browse our catalog of modern, fully equipped campers designed for comfortable and free travel.',
  metadataBase: new URL('https://campers-wine-phi.vercel.app'),
  openGraph: {
    title: 'Campers Catalog | TravelTrucks',
    description:
      'Discover the perfect camper for your next adventure. Browse our catalog of modern, fully equipped campers designed for comfortable and free travel.',
    url: 'https://campers-wine-phi.vercel.app',
    siteName: 'TravelTrucks',
    type: 'website',
  },
};

export default async function CatalogPage() {
  return (
    <div>
      <CampersClient />
    </div>
  );
}