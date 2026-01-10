export interface Camper {
    id: string;
    name: string;
    price: number;
    location: string;
    rating: number;
    reviews: number;
    image: string;
    transmission: 'automatic' | 'manual';
    engine: 'petrol' | 'diesel';
    kitchen: boolean;
    AC: boolean;
    bathroom: boolean;
    TV: boolean;
    type: 'van' | 'fully_integrated' | 'alcove';
  }