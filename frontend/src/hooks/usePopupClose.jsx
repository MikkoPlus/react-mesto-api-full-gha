import { useEffect } from "react";

export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (evt) => {
      const el = evt.target;
      if (
        el.classList.contains("popup_active") ||
        el.classList.contains("popup__close")
      ) {
        closePopup();
      }
    };

    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, closePopup]);
}
