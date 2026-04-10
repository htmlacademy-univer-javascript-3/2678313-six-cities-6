import {Action, createAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {adaptOfferPreviewToClient, adaptOfferToClient} from '../api';
import {APIRoute, AuthorizationStatus} from '../const';
import {dropToken, saveToken} from '../services/token';
import {Offer, OfferPreview, OfferPreviewResponse, OfferResponse} from '../types/offer';
import {AuthData, LoginData, UserData} from '../types/user';
import type {State} from './reducer';

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export const changeCity = createAction<string>('app/changeCity');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const saveUserData = createAction<UserData | null>('user/saveUserData');

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

export const checkAuthAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const {data} = await api.get<AuthData>(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(saveUserData({email: data.email}));
    saveToken(data.token);
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(saveUserData(null));
  }
};

export const loginAction = ({email, password}: LoginData): ThunkActionResult => async (dispatch, _getState, api) => {
  const {data} = await api.post<AuthData>(APIRoute.Login, {email, password});

  saveToken(data.token);
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
  dispatch(saveUserData({email: data.email}));
};

export const logoutAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  dispatch(saveUserData(null));
};
