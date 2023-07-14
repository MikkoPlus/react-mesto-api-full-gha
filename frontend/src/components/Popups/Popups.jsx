import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoTooltip from "./InfoTooltip";

function Popups({
  isEditProfilePopupOpen,
  isEditAvatarPopupOpen,
  isAddPlacePopupOpen,
  isConfirmPopupOpen,
  isImagePopupOpen,
  isInfoTooltipOpen,
  closeAllPopups,
  onUpdateAvatar,
  onUpdateUser,
  onAddPlace,
  onDeleteCard,
  currentCardId,
  selectedCard,
  accessStatus,
}) {
  return (
    <section className="popups">
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={onUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={onUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={onAddPlace}
      />

      <ConfirmDeletePopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={onDeleteCard}
        currentCardId={currentCardId}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        accessStatus={accessStatus}
      />
    </section>
  );
}

export default Popups;
