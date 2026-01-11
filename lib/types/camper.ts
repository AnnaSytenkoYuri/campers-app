export interface CamperGalleryItem {
  thumb: string;
  original: string;
}

export interface CamperReview {
  rating: number;
  user: string;
  id: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}


export interface Camper {
    id: string;
    name: string;
    price: number;
    location: string;
    rating: number;
    reviews?: CamperReview[];
    image: string[];
    gallery?: CamperGalleryItem[];
    transmission: 'automatic' | 'manual';
    engine: 'petrol' | 'diesel';
    kitchen: boolean;
    AC: boolean;
    bathroom: boolean;
    TV: boolean;
    form: 'van' | 'fully_integrated' | 'alcove';
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