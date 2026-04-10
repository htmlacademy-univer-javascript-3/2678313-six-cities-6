import {TOKEN_KEY_NAME} from '../const';

export const getToken = (): string => localStorage.getItem(TOKEN_KEY_NAME) ?? '';

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY_NAME);
};
