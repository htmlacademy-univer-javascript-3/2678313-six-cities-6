export type Offer = {
  id: string;
  title: string;
  type: 'Apartment' | 'Room' | 'House';
  price: number;
  city: string;
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
