import { useContext } from "react";
import Card from "../SingleComponent/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onCardClick, onAddCard, cards, onCardLike, onTrashBagClick, additionalClass}) {
  const { about, avatar, name } = useContext(CurrentUserContext);




  
  return (
    <main className={`content ${additionalClass}`}>
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
          <img src={avatar} alt="Avatar" className="profile__avatar" />
        </div>
        <div className="profile__information">
          <h1 className="profile__name">{name}</h1>
          <button
            className="profile__edit-btn"
            onClick={onEditProfile}
          ></button>
          <h2 className="profile__job">{about}</h2>
        </div>

        <button
          className="profile__add-button"
          onClick={onAddCard}
        ></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onTrashBagClick={onTrashBagClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
