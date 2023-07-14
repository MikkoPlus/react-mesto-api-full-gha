import logo from "../../images/icons/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({
  additionalClass,
  isLoggedIn,
  userEmail,
  isMenuOpened,
  handleChangeMenuVisability,
  onLogOut,
}) {
  const onSignOut = () => {
    onLogOut();
  };

  const handleBurgerClick = () => {
    handleChangeMenuVisability();
  };

  return (
    <header className={`header ${isLoggedIn && additionalClass}`}>
      <Link to="/" className="header__link">
        <img src={logo} alt="Mesto Russia" className="logo" />
      </Link>
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <>
              <div
                onClick={handleBurgerClick}
                className={`burger${isMenuOpened ? " burger_open" : ""}`}
              >
                <span className="burger-line"></span>
              </div>
              <div className="header__menu menu">
                <ul className="menu__list">
                  <li className="menu__item">{userEmail}</li>
                  <li
                    className="menu__item menu__itme_grey"
                    onClick={onSignOut}
                  >
                    Выйти
                  </li>
                </ul>
              </div>
            </>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__replace-link">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__replace-link">
              Регистрация
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;