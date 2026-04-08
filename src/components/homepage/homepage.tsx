import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity, fetchOffersAction, logoutAction} from '../../store/action';
import {
  getAuthorizationStatus,
  getCity,
  getHasOffersErrorStatus,
  getOffersByCity,
  getOffersLoadingStatus,
  getUserData,
} from '../../store/reducer';
import {OfferPreview} from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortingOptions, {SortingType} from '../sorting-options/sorting-options';
import Spinner from '../spinner/spinner';

const locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const sortingOptions: SortingType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

function sortOffersByType(offers: OfferPreview[], sortingType: SortingType): OfferPreview[] {
  switch (sortingType) {
    case 'Price: low to high':
      return [...offers].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
    case 'Price: high to low':
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
    case 'Top rated first':
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
    case 'Popular':
    default:
      return offers;
  }
}

function HomepageShell(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffersByCity);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const hasOffersError = useAppSelector(getHasOffersErrorStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [currentSorting, setCurrentSorting] = useState<SortingType>('Popular');
  const sortedOffers = sortOffersByType(offers, currentSorting);

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

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Home}>
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
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorite}>
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__user-name user__name">{userData?.email}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <button
                        className="header__nav-link button"
                        type="button"
                        onClick={() => {
                          void dispatch(logoutAction()).catch(() => {});
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={locations}
              currentCity={city}
              onCityChange={(selectedCity) => dispatch(changeCity(selectedCity))}
            />
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
              <SortingOptions
                options={sortingOptions}
                currentSorting={currentSorting}
                onSortingChange={setCurrentSorting}
              />

              <OffersList offers={sortedOffers} onActiveOfferChange={setActiveOfferId} />
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={sortedOffers} selectedOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomepageShell;
