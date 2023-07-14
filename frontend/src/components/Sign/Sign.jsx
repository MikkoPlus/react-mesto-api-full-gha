import Form from "../SingleComponent/Form";
import Input from "../SingleComponent/Input";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Sign({ name, title, btnText, handleSubmit, children }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const { email, password } = values;

  return (
    <div className="sign">
      <Form
        name={name}
        title={title}
        titleClass="form-title_type_sign"
        handleSubmit={() => handleSubmit(values)}
        btnText={btnText}
        btnClass="form__btn_type_sign"
        isFormValid={isValid}
      >
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
          inputClass="form__input_type_sign"
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={handleChange}
          inputClass="form__input_type_sign"
          error={errors.password}
        />
      </Form>
      {children}
    </div>
  );
}

export default Sign;
