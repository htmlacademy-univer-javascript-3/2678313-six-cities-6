export enum AppRoute {
  Home = '/',
  Login = '/login',
  Favorite = '/favorites',
  OfferId = '/offer/:id'
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout'
}

export const SERVER_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const TOKEN_KEY_NAME = 'six-cities-token';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}
