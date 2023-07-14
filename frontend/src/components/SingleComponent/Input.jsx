import { useEffect, useState } from "react";

function Input({
  name,
  type,
  placeholder,
  minLength,
  maxLength,
  value,
  onChange,
  isPopupOpen,
  inputClass,
  error
}) {
  const [isDirty, setIsDirty] = useState(false);

  const inputClassName = inputClass
    ? `form__input ${inputClass}`
    : "form__input";

  useEffect(() => {
    setIsDirty(false);
  }, [isPopupOpen]);

  return (
    <>
      <input
        required
        name={name}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value || ''}
        onChange={onChange}
        onBlur={() => setIsDirty(true)}
      />
      {isDirty &&  (
        <span id={`input-error`} className="form__input-text-error">
          {error}
        </span>
      )}
    </>
  );
}

export default Input;
