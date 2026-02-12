import { getCamperById } from "@/lib/api/campersApi";
import { Metadata } from "next";
import CamperPage from "./CamperPage";

type Props={
  params: Promise<{id:string}>;
}

export async function generateMetadata({params}: Props): Promise<Metadata>{
  const {id} = await params;

  const idNum = Number(id);
  if(Number.isNaN(idNum)) {
    return {
      title: 'Camper not found | TravelTrucks',
      description: 'Invalid camper id.',
    };
  }
  const camper = await getCamperById(idNum.toString());
  if(!camper) {
    return {
      title: 'Camper not found | TravelTrucks',
      description: 'The requested camper does not exist.',
    };
  }
  const description = (camper.description ?? '').trim();
  return{
    title: `${camper.name} | TravelTrucks`,
    description: description.length > 0 ? description : `Explore the ${camper.name} on TravelTrucks. Find features, reviews, and booking options for your next adventure.`,
    openGraph: {
      title: `${camper.name} | TravelTrucks`,
      description: description.length > 0 ? description : `Explore the ${camper.name} on TravelTrucks. Find features, reviews, and booking options for your next adventure.`,
      url: `https://campers-wine-phi.vercel.app/catalog/${id}`,
      siteName: 'TravelTrucks',
      type: 'website',
      images: camper.gallery && camper.gallery.length > 0
        ? [
            {
              url: camper.gallery[0].original,
              width: 1200,
              height: 630,
              alt: camper.name,
            },
          ]
        : undefined,
    }
  }
}

export default async function Page({params}: Props){
  const {id} = await params;
  return <CamperPage id={id}/>;
} 
