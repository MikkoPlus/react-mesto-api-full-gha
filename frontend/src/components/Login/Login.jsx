import Sign from "../Sign/Sign";

function Login({ onLogin }) {
  return (
    <Sign
      name="login"
      title="Вход"
      btnText="Войти"
      handleSubmit={onLogin}
    />
  );
}
export default Login;
