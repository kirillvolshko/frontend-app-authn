import React, { useState, useEffect } from 'react'
import { useIntl } from '@edx/frontend-platform/i18n';
import { isValidUkrainianPhoneNumber } from '../../data/service';

export default function PhoneFields({ label, name, onValidChange, registration }) {
  const intl = useIntl();
  const [validationError, setValidationError] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    // Check validity on mount and when registration state changes
    if (registration && touched && !isValidUkrainianPhoneNumber('')) {
      setValidationError(intl.formatMessage({ id: 'account.settings.field.phone.number.invalid', defaultMessage: 'Invalid phone number +380*********' }));
      onValidChange(false);
    }
  }, [registration]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (name === 'phone_number' && !isValidUkrainianPhoneNumber(newValue)) {
      setValidationError(intl.formatMessage({ id: 'account.settings.field.phone.number.invalid', defaultMessage: 'Invalid phone number +380*********' }));
      onValidChange(false);
    } else {
      setValidationError(null);
      onValidChange(true);
    }

  };

  const handleClick = () => {
    setTouched(true);
  };

  const handleBlur = (e) => {
    if (touched && !e.target.value) {
      setValidationError(intl.formatMessage({ id: 'account.settings.field.phone.number.invalid', defaultMessage: 'Invalid phone number +380*********' }));
      onValidChange(false);
    }
  };

  return (
    <div className='pgn__form-group tw-mb-[24px]'>
      <div className='tw-block'>
        <label className='tw-font-grotesk tw-text-[16px] tw-text-netural-1000 tw-leading-[21.12px] tw-font-medium tw-mb-[8px]'>{label}</label>
        <div className={`pgn__form-control-decorator-group ${validationError ? 'pgn__form-control--error' : ''}`}>
          <input
            className={`form-control ${validationError ? 'form-control-error' : ''}`}
            name={name}
            onChange={handleChange}
            onClick={handleClick}
            onBlur={handleBlur}
          />
        </div>
        {validationError && <span className="pgn__form-control-description form-text-size pgn__form-text pgn__form-text-invalid">{validationError}</span>}
      </div>
    </div>
  );
}