import { getCampers } from "@/lib/api/campersApi";
import CampersList from "@/components/Catalog/CampersList";

// interface CatalogPageProps {
//   searchParams: Record<string, string>;
// }

export default async function CatalogPage() {
  const campers = await getCampers();

  return <CampersList campers={campers} />;
}