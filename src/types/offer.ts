export type Offer = {
  id: string;
  title: string;
  type: 'Apartment' | 'Room' | 'House';
  price: number;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};
