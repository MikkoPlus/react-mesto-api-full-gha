import * as mestoAuth from "./../utils/mestoAuth.js";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ApiRequestLoadingContext } from "../contexts/ApiRequestLoadingContext";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/Api";
import Popups from "./Popups/Popups";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessStatus, setAccessStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function handleLogOut() {
    mestoAuth
    .signout()
    .then(({message})=> {
      setLoggedIn(false);
      console.log(message)
    })
  }

  function setAdditionalClass() {
    return `translate-block${isMenuOpened ? " translate-block_active" : ""}`;
  }

  function handleChangeLoggedInState(bool) {
    setLoggedIn(bool);
  }

  function handleChangeMenuVisability() {
    setIsMenuOpened(!isMenuOpened);
  }

  function handleSetEmail(email) {
    setUserEmail(email);
  }

  const checkToken = () => {
    setIsLoading(true);
    mestoAuth
      .checkTokenValidity()
      .then((data) => {
        handleSetEmail(data.email);
        handleChangeLoggedInState(true);
        navigate("/home");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function handleLogin(formValuesObj) {
    setIsLoading(true);
    mestoAuth
      .login(formValuesObj)
      .then((data) => {
        if (data) {
          checkToken();
        }
      })
      .catch((err) => {
        console.error()
        setAccessStatus(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 1000);
      });
  }

  function handleRegister(formValuesObj) {
    setIsLoading(true);
    mestoAuth
      .register(formValuesObj)
      .then((res) => {
        setAccessStatus(true);
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
        return res;
      })
      .catch((err) => {
        setAccessStatus(false);
        console.error()
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 2000);
      });
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some((human) => human === currentUser._id);

    api
      .toggleLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
        );
      })
      .catch(console.error)
  }

  function handleDeleteCard(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(requestObj) {
    setIsLoading(true);
    api
      .setUserInfo(requestObj)
      .then((updateProfileData) => {
        setCurrentUser(updateProfileData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(requestObj) {
    setIsLoading(true);
    api
      .postAvatar(requestObj)
      .then((updateProfileData) => {
        setCurrentUser(updateProfileData);
        closeAllPopups();
      })

      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleAddPlace(requestObj) {
    setIsLoading(true);
    api
      .postNewCard(requestObj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleAvatarClick() {
    return setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    return setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    return setIsAddPlacePopupOpen(true);
  }

  function handleTrashBagClick(currentCardId) {
    setIsConfirmPopupOpen(true);
    setCardId(currentCardId);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const isPopupOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isPopupOpen) {
      document.addEventListener("keydown", closeByEsc);
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [isPopupOpen]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setTimeout(() => {
      setSelectedCard({});
    }, 500);
  }
  useEffect(() => {
    const jwt = document.cookie.jwt
    if (!jwt) {
      return;
    }
    checkToken(jwt);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      setIsMenuOpened(false);
    } else {
      api
      .getProfileData()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.log(err));

      api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          additionalClass={setAdditionalClass()}
          isLoggedIn={loggedIn}
          userEmail={userEmail}
          isMenuOpened={isMenuOpened}
          handleChangeMenuVisability={handleChangeMenuVisability}
          onLogOut={handleLogOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="sign-in" replace />
              )
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onCardLike={handleLikeCard}
                onEditAvatar={handleAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onTrashBagClick={handleTrashBagClick}
                onCardClick={handleCardClick}
                card={selectedCard}
                additionalClass={setAdditionalClass()}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
        {loggedIn && <Footer additionalClass={setAdditionalClass()} />}
        <ApiRequestLoadingContext.Provider value={isLoading}>
          <Popups
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isConfirmPopupOpen={isConfirmPopupOpen}
            isImagePopupOpen={isImagePopupOpen}
            isInfoTooltipOpen={isInfoTooltipOpen}
            closeAllPopups={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onUpdateUser={handleUpdateUser}
            onAddPlace={handleAddPlace}
            onDeleteCard={handleDeleteCard}
            currentCardId={cardId}
            selectedCard={selectedCard}
            accessStatus={accessStatus}
          />
        </ApiRequestLoadingContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
