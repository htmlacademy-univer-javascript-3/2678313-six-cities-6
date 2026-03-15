import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Homepage from '../homepage/homepage';
import LoginPage from '../login-page/login-page';
import FavoritesPage from '../favorites-page/favorites-page';
import OfferPage from '../offer-page/offer-page';
import {AppRoute} from '../../const';
import NotFound from '../not-found/not-found';
import {Offer} from '../../types/offer';

type AppProps = {
  offers: Offer[];
};

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Home} element={<Homepage offers={offers} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorite}
          element={<FavoritesPage offers={offers} />}
        />
        <Route path={AppRoute.OfferId} element={<OfferPage offers={offers} />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
