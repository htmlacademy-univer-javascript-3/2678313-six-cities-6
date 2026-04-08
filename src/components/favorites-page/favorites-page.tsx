import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOffersAction} from '../../store/action';
import {getHasOffersErrorStatus, getOffers, getOffersLoadingStatus} from '../../store/reducer';
import {OfferPreview} from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import Spinner from '../spinner/spinner';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const hasOffersError = useAppSelector(getHasOffersErrorStatus);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  if (hasOffersError) {
    return (
      <p style={{padding: '40px', textAlign: 'center'}}>
        Failed to load offers. Please try again later.
      </p>
    );
  }

  const offersByCity = favoriteOffers.reduce<Record<string, OfferPreview[]>>((acc, offer) => {
    if (!acc[offer.city]) {
      acc[offer.city] = [];
    }
    acc[offer.city].push(offer);
    return acc;
  }, {});

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Home}>
                <img
                  className="header__logo"
                  src="/img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorite}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, cityOffers]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.Home}>
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <OffersList offers={cityOffers} className="favorites__places" cardType="favorites" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Home}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
