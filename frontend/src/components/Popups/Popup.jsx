import closeIcon from "../../images/icons/close-icon.svg";
import { usePopupClose } from "../../hooks/usePopupClose";
function Popup({ popupClass, type, children, isOpen, onClose }) {

  usePopupClose(isOpen, onClose)

  const popupClassName = popupClass ? `popup ${popupClass}` : "popup";

  return (
    <div
      className={`${popupClassName} ${isOpen ? "popup_active" : ""}`}
    >
      <div className={`popup__window popup__window_type_${type}`}>
        <img src={closeIcon} alt="Close" className="popup__close" />
        {children}
      </div>
    </div>
  );
}

export default Popup;
