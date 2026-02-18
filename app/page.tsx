import HeroBlock from '@/components/HeroBlock/HeroBlock';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TravelTrucks – Camper Rental Platform',
  description:
    'TravelTrucks is a camper rental platform that helps you find the perfect vehicle for road trips, vacations, and unforgettable travel experiences.',
  metadataBase: new URL('https://campers-wine-phi.vercel.app'),
  openGraph: {
    title: 'TravelTrucks – Camper Rental Platform',
    description:
      'Find and rent the perfect camper for your next adventure. TravelTrucks offers comfortable and reliable campers for road trips and outdoor journeys.',
    url: 'https://campers-wine-phi.vercel.app',
    siteName: 'TravelTrucks',
    type: 'website',
  },
};

const HopePage = () => {
  return (
    <div>
      <HeroBlock />
    </div>
  );
};

export default HopePage;