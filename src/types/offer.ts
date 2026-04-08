export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type Location = {
  lat: number;
  lng: number;
  zoom: number;
};

export type OfferPreview = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: string;
  location: Location;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
};

export type Offer = OfferPreview & {
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
};

export type LocationResponse = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityResponse = {
  name: string;
  location: LocationResponse;
};

export type OfferPreviewResponse = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityResponse;
  location: LocationResponse;
  previewImage: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
};

export type OfferResponse = OfferPreviewResponse & {
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
};
