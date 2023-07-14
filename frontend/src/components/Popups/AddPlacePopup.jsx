import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "../SingleComponent/Input";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const { name, link } = values;

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, [isOpen]);

  function handleSubmit() {
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      btnText="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <Input
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleChange}
        isPopupOpen={isOpen}
        error={errors.name}
      />
      <Input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        minLength="2"
        value={link}
        onChange={handleChange}
        isPopupOpen={isOpen}
        error={errors.link}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
