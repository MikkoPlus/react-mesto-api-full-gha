import Form from "../SingleComponent/Form";
import Popup from "./Popup";

function PopupWithForm({
  name,
  title,
  btnText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isFormValid
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} type="form">
      <Form
        name={name}
        title={title}
        formTitleClass="form-title_type_popup"
        handleSubmit={onSubmit}
        btnText={btnText}
        isFormValid={isFormValid}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
