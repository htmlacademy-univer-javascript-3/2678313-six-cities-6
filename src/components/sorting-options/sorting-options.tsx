import {useState} from 'react';

export type SortingType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

type SortingOptionsProps = {
  options: SortingType[];
  currentSorting: SortingType;
  onSortingChange: (sorting: SortingType) => void;
};

function SortingOptions({
  options,
  currentSorting,
  onSortingChange,
}: SortingOptionsProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((opened) => !opened)}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpened ? ' places__options--opened' : ''}`}>
        {options.map((option) => (
          <li
            className={`places__option${option === currentSorting ? ' places__option--active' : ''}`}
            tabIndex={0}
            key={option}
            onClick={() => {
              onSortingChange(option);
              setIsOpened(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
