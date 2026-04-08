import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {Offer, OfferPreview} from '../types/offer';
import {UserData} from '../types/user';
import {
  changeCity,
  loadOffer,
  loadOffers,
  requireAuthorization,
  saveUserData,
  setOfferErrorStatus,
  setOfferLoadingStatus,
  setOffersErrorStatus,
  setOffersLoadingStatus,
} from './action';

export type State = {
  city: string;
  offers: OfferPreview[];
  isOffersLoading: boolean;
  hasOffersError: boolean;
  offer: Offer | null;
  isOfferLoading: boolean;
  hasOfferError: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false,
  hasOffersError: false,
  offer: null,
  isOfferLoading: false,
  hasOfferError: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const getCity = (state: State): string => state.city;
export const getOffers = (state: State): OfferPreview[] => state.offers;
export const getOffersByCity = (state: State): OfferPreview[] =>
  state.offers.filter((offerItem) => offerItem.city === state.city);
export const getOffersLoadingStatus = (state: State): boolean => state.isOffersLoading;
export const getHasOffersErrorStatus = (state: State): boolean => state.hasOffersError;
export const getOffer = (state: State): Offer | null => state.offer;
export const getOfferLoadingStatus = (state: State): boolean => state.isOfferLoading;
export const getHasOfferErrorStatus = (state: State): boolean => state.hasOfferError;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
export const getUserData = (state: State): UserData | null => state.userData;

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(saveUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setOffersErrorStatus, (state, action) => {
      state.hasOffersError = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setOfferErrorStatus, (state, action) => {
      state.hasOfferError = action.payload;
    });
});

export default reducer;
