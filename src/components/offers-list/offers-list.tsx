import {Offer} from '../../types/offer';
import PlaceCard, {PlaceCardType} from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  className?: string;
  cardType?: PlaceCardType;
  onActiveOfferChange?: (offerId: string | null) => void;
};

function OffersList({
  offers,
  className = 'cities__places-list places__list tabs__content',
  cardType = 'cities',
  onActiveOfferChange,
}: OffersListProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onHover={(offerId) => onActiveOfferChange?.(offerId)}
          onLeave={() => onActiveOfferChange?.(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;
