import { useEffect } from "react";
import Input from "../SingleComponent/Input";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = () => {
    onUpdateAvatar(values);
  };

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <Input
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        isPopupOpen={isOpen}
        error={errors.avatar}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
