import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {REQUEST_TIMEOUT, SERVER_URL} from './const';
import {getToken} from './services/token';
import {Location, LocationResponse, Offer, OfferPreview, OfferPreviewResponse, OfferResponse} from './types/offer';

const adaptLocationToClient = (location: LocationResponse): Location => ({
  lat: location.latitude,
  lng: location.longitude,
  zoom: location.zoom,
});

export const adaptOfferPreviewToClient = (offer: OfferPreviewResponse): OfferPreview => ({
  id: offer.id,
  title: offer.title,
  type: offer.type as OfferPreview['type'],
  price: offer.price,
  city: offer.city.name,
  location: adaptLocationToClient(offer.location),
  previewImage: offer.previewImage,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  rating: offer.rating,
});

export const adaptOfferToClient = (offer: OfferResponse): Offer => ({
  ...adaptOfferPreviewToClient(offer),
  description: offer.description,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  goods: offer.goods,
  host: offer.host,
  images: offer.images,
});

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};
