import Popup from './Popup';
import { useState, useEffect } from 'react';

function InfoTooltip({ accessStatus, isOpen, onClose }) {
  const [tooltipText, setTooltipText] = useState('');
  const imageClassName = `popup__info-img ${
    accessStatus
      ? 'popup__info-img_type_access'
      : 'popup__info-img_type_access-denied'
  }`;

  useEffect(() => {
    if (accessStatus) {
      setTooltipText('Вы успешно зарегистрировались!');
    } else {
      setTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
    }

    return () => {
      setTooltipText('');
    };
  }, [accessStatus]);

  return (
    <Popup
      popupClass='info-tooltip'
      type='info-tooltip'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={imageClassName} />

      <p className='popup__info-title'>{tooltipText}</p>
    </Popup>
  );
}

export default InfoTooltip;
