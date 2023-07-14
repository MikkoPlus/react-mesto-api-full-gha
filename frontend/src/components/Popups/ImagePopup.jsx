import Popup from "./Popup";

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <Popup
      popupClass="popup_fullscreen-img"
      isOpen={isOpen}
      onClose={onClose}
      type="fullscreen-img"
    >
      <img
        src={card.link || "#"}
        alt={card.name || "#"}
        className="popup__fullscreen-image"
      />
      <h3 className="popup__descr">{card.name || ""}</h3>
    </Popup>
  );
}

export default ImagePopup;
