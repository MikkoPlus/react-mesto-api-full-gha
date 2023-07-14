import { useContext } from "react";
import { ApiRequestLoadingContext } from "../../contexts/ApiRequestLoadingContext";
import Spinner from "../SingleComponent/Spinner";

function Form({
  name,
  title,
  children,
  handleSubmit,
  btnText,
  titleClass,
  btnClass,
  isFormValid
}) {
  const isLoading = useContext(ApiRequestLoadingContext);


  const btnClassName = btnClass ? `form__btn ${btnClass}` : "form__btn";

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <h4 className={`form-title ${titleClass ? titleClass : ''}`}>{title}</h4>
      <form
        noValidate="noValidate"
        className={`form ${isLoading ? "form_is-loading" : ""}`}
        id={`${name}-form`}
        name={name}
        onSubmit={handleSubmitForm}
      >
        <Spinner isLoading={isLoading} />
        {children}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`${btnClassName} ${
            !isFormValid || isLoading ? "form__btn_disabled" : ""
          }`}
        >
          {btnText}
        </button>
      </form>
    </>
  );
}

export default Form;
