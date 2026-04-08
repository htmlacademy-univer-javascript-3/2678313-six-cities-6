import {useEffect} from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {checkAuthAction} from '../../store/action';
import FavoritesPage from '../favorites-page/favorites-page';
import Homepage from '../homepage/homepage';
import LoginPage from '../login-page/login-page';
import NotFound from '../not-found/not-found';
import OfferPage from '../offer-page/offer-page';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Home} element={<Homepage />} />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorite}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.OfferId} element={<OfferPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
