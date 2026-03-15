import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';

export type PlaceCardType = 'cities' | 'favorites' | 'near';

type PlaceCardProps = {
  offer: Offer;
  cardType?: PlaceCardType;
  onHover?: (offerId: string) => void;
  onLeave?: () => void;
};

const cardClassByType: Record<PlaceCardType, string> = {
  cities: 'cities__card place-card',
  favorites: 'favorites__card place-card',
  near: 'near-places__card place-card',
};

const imageWrapperClassByType: Record<PlaceCardType, string> = {
  cities: 'cities__image-wrapper place-card__image-wrapper',
  favorites: 'favorites__image-wrapper place-card__image-wrapper',
  near: 'near-places__image-wrapper place-card__image-wrapper',
};

const infoClassByType: Record<PlaceCardType, string> = {
  cities: 'place-card__info',
  favorites: 'favorites__card-info place-card__info',
  near: 'place-card__info',
};

const imageSizeByType: Record<PlaceCardType, {width: number; height: number}> = {
  cities: {width: 260, height: 200},
  favorites: {width: 150, height: 110},
  near: {width: 260, height: 200},
};

function PlaceCard({offer, cardType = 'cities', onHover, onLeave}: PlaceCardProps): JSX.Element {
  const {width, height} = imageSizeByType[cardType];
  const ratingWidth = `${(offer.rating / 5) * 100}%`;

  return (
    <article
      className={cardClassByType[cardType]}
      onMouseEnter={() => onHover?.(offer.id)}
      onMouseLeave={() => onLeave?.()}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClassByType[cardType]}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={infoClassByType[cardType]}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidth}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
