import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute} from '../../const';
import {changeCity} from '../../store/action';
import {RootState} from '../../store';
import {getCity, getOffersByCity} from '../../store/reducer';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';

const locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

const sortingOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

function HomepageShell(): JSX.Element {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => getCity(state));
  const offers = useSelector((state: RootState) => getOffersByCity(state));
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

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
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorite}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
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
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {sortingOptions.map((option) => (
                    <li
                      className={`places__option${
                        option === 'Popular' ? ' places__option--active' : ''
                      }`}
                      tabIndex={0}
                      key={option}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </form>

              <OffersList offers={offers} onActiveOfferChange={setActiveOfferId} />
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} selectedOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomepageShell;
