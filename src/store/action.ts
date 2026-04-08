import {Action, createAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {adaptOfferPreviewToClient, adaptOfferToClient} from '../api';
import {APIRoute} from '../const';
import {Offer, OfferPreview, OfferPreviewResponse, OfferResponse} from '../types/offer';
import type {State} from './reducer';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export const changeCity = createAction<string>('app/changeCity');
export const loadOffers = createAction<OfferPreview[]>('data/loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const setOffersErrorStatus = createAction<boolean>('data/setOffersErrorStatus');
export const loadOffer = createAction<Offer | null>('data/loadOffer');
export const setOfferLoadingStatus = createAction<boolean>('data/setOfferLoadingStatus');
export const setOfferErrorStatus = createAction<boolean>('data/setOfferErrorStatus');

export const fetchOffersAction = (): ThunkActionResult => async (dispatch, getState, api) => {
  const state = getState();

  if (state.offers.length > 0 || state.isOffersLoading) {
    return;
  }

  dispatch(setOffersLoadingStatus(true));
  dispatch(setOffersErrorStatus(false));

  try {
    const {data} = await api.get<OfferPreviewResponse[]>(APIRoute.Offers);
    dispatch(loadOffers(data.map(adaptOfferPreviewToClient)));
  } catch {
    dispatch(setOffersErrorStatus(true));
  } finally {
    dispatch(setOffersLoadingStatus(false));
  }
};

export const fetchOfferAction = (offerId: string): ThunkActionResult => async (dispatch, getState, api) => {
  const state = getState();

  if ((state.offer !== null && state.offer.id === offerId) || state.isOfferLoading) {
    return;
  }

  dispatch(setOfferLoadingStatus(true));
  dispatch(setOfferErrorStatus(false));
  dispatch(loadOffer(null));

  try {
    const {data} = await api.get<OfferResponse>(`${APIRoute.Offers}/${offerId}`);
    dispatch(loadOffer(adaptOfferToClient(data)));
  } catch {
    dispatch(setOfferErrorStatus(true));
  } finally {
    dispatch(setOfferLoadingStatus(false));
  }
};
