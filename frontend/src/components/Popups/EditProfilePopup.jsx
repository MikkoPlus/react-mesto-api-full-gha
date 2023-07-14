import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "../SingleComponent/Input";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const { name, about } = values;
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm();

    if (isOpen) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
    // eslint-disable-next-line
  }, [isOpen, currentUser]);

  function handleSubmit() {
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      Novalidate
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <Input
        type="text"
        placeholder="Введите имя"
        name="name"
        minLength="2"
        maxLength="20"
        value={name}
        onChange={handleChange}
        isPopupOpen={isOpen}
        error={errors.name}
      />
      <Input
        type="text"
        placeholder="Введите занятие"
        name="about"
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleChange}
        isPopupOpen={isOpen}
        error={errors.about}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
