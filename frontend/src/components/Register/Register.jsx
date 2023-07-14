import Sign from "../Sign/Sign";
import { Link } from "react-router-dom";


function Register({ onRegister }) {

  return (
    <Sign
      name="register"
      title="Регистрация"
      btnText="Зарегистрироваться"
      handleSubmit={onRegister}
    >
      <div className="sign__replace-wrapper">
        <p className="sign__replace-text">Уже зарегистриврованны? </p>
        <Link to="/sign-in" className="sign__replace-text sign__replace-link">
          Войти
        </Link>
      </div>
    </Sign>
  );
}
export default Register;
