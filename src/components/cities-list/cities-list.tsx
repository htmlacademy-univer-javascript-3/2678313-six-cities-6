type CitiesListProps = {
  cities: string[];
  currentCity: string;
  onCityChange: (city: string) => void;
};

function CitiesList({cities, currentCity, onCityChange}: CitiesListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item${city === currentCity ? ' tabs__item--active' : ''}`}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
