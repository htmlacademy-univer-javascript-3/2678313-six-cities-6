import {Offer} from '../types/offer';
import {ActionType, Actions} from './action';

export type State = {
  city: string;
  offers: Offer[];
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
};

export const getCity = (state: State): string => state.city;

export const getOffersByCity = (state: State): Offer[] =>
  state.offers.filter((offer) => offer.city === state.city);

function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.FillOffers:
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
