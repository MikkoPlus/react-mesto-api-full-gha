import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({
  isOpen,
  onClose,
  currentCardId,
  onDeleteCard,
  isLoading,
}) {
  function handleSubmit() {
    onDeleteCard(currentCardId);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="delete-card"
      title="Вы уверены?"
      btnText={`${isLoading ? "Удаление..." : "Да"}`}
      isOpen={isOpen}
      onClose={onClose}
      isFormValid={true}
    />
  );
}

export default ConfirmDeletePopup;
