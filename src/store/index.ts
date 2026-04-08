import {AxiosError, HttpStatusCode} from 'axios';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../api';
import {AuthorizationStatus} from '../const';
import {dropToken} from '../services/token';
import {requireAuthorization, saveUserData} from './action';
import reducer from './reducer';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(saveUserData(null));
    }

    return Promise.reject(error);
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
