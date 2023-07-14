import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onTrashBagClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwnersCard = card.owner === currentUser._id;
  const isLiked = card.likes.some((id) => id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleTrashBagClick() {
    onTrashBagClick(card._id);
  }

  return (
    <li className='place-card'>
      {isOwnersCard && (
        <div className='place-card__trash-bag' onClick={handleTrashBagClick} />
      )}
      <img
        src={card.link}
        alt={card.name}
        className='place-card__image'
        onClick={handleCardClick}
      />
      <div className='place-card__footer'>
        <h3 className='place-card__descr'>{card.name}</h3>
        <div className='place-card__like'>
          <button className='place-card__like-btn' onClick={handleLikeClick}>
            <div
              className={`place-card__heart ${
                isLiked && 'place-card__heart_like'
              }`}
            ></div>
          </button>
          <div className='place-card__counter'>
            {card.likes.length !== 0 ? card.likes.length : ''}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
