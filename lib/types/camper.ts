export interface CamperGalleryItem {
  thumb: string;
  original: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  location: string;
  rating: number;
  reviews: Review[];
  gallery: CamperGalleryItem[];
  transmission: string;
  engine: string;
  kitchen: boolean;
  AC: boolean;
  bathroom: boolean;
  TV: boolean;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  description: string;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface FilterOptions {
  equipment: 'AC' | 'kitchen' | 'TV' | 'bathroom' | 'automatic' | 'manual';
  type: 'panelTrack' | 'FullyIntegrated' | 'Alcove';
}
