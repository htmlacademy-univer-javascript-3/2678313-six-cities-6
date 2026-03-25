import {offers} from '../mocks/offers';

export enum ActionType {
  ChangeCity = 'app/changeCity',
  FillOffers = 'app/fillOffers',
}

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity as const,
  payload: city,
});

export const fillOffers = () => ({
  type: ActionType.FillOffers as const,
  payload: offers,
});

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffers>;
