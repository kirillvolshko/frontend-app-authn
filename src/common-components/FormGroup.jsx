import React, { useState } from 'react';

import {
  Form, TransitionReplace,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import messages from '../register/messages';
import icon from '../assets/vector.svg'
import { injectIntl, useIntl } from '@edx/frontend-platform/i18n';
const FormGroup = (props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const { formatMessage } = useIntl();
  const handleFocus = (e) => {
    setHasFocus(true);
    if (props.handleFocus) { props.handleFocus(e); }
  };
  const handleClick = (e) => {
    if (props.handleClick) { props.handleClick(e); }
  };
  const handleOnBlur = (e) => {
    setHasFocus(false);
    if (props.handleBlur) { props.handleBlur(e); }
  };

  return (
    <Form.Group controlId={props.name} className={props.className} isInvalid={props.errorMessage !== ''}>
      <Form.Label className="tw-font-grotesk tw-text-[16px] tw-text-netural-1000 tw-leading-[12.12px] tw-font-medium tw-mb-[8px]">{props.floatingLabel}</Form.Label>
      {props.name === 'name' && (
        <div className='tw-flex tw-items-start'>
          <img src={icon} alt='question icon' />
          <Form.Label className="tw-font-grotesk tw-text-[14px] tw-text-neutral-1000 tw-leading-[12.12px] tw-font-medium tw-mb-[8px] tw-ml-[9px]">
            {formatMessage(messages['registration.username.label.under'])}
          </Form.Label>
        </div>
      )}

      <Form.Control
        as={props.as}
        readOnly={props.readOnly}
        type={props.type}
        aria-invalid={props.errorMessage !== ''}
        autoComplete={props.autoComplete}
        spellCheck={props.spellCheck}
        name={props.name}
        value={props.value}
        onBlur={handleOnBlur}
        onClick={handleClick}
        onChange={props.handleChange}
        controlClassName={props.borderClass}
        trailingElement={props.trailingElement}
      >
        {props.options ? props.options() : null}
      </Form.Control>
      <TransitionReplace>
        {hasFocus && props.helpText ? (
          <Form.Control.Feedback type="default" key="help-text" className="d-block form-text-size">
            {props.helpText.map((message, index) => (
              <span key={`help-text-${index.toString()}`}>
                {message}
                <br />
              </span>
            ))}
          </Form.Control.Feedback>
        ) : <div key="empty" />}
      </TransitionReplace>
      {props.errorMessage !== '' && (
        <Form.Control.Feedback key="error" className="form-text-size" hasIcon={false} feedback-for={props.name} type="invalid">{props.errorMessage}</Form.Control.Feedback>
      )}
      {props.children}
    </Form.Group>
  );
};

FormGroup.defaultProps = {
  as: 'input',
  autoComplete: null,
  borderClass: '',
  children: null,
  className: '',
  errorMessage: '',
  handleBlur: null,
  handleChange: () => { },
  handleClick: null,
  handleFocus: null,
  helpText: [],
  options: null,
  readOnly: false,
  spellCheck: null,
  trailingElement: null,
  type: 'text',
};

FormGroup.propTypes = {
  as: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }).isRequired,
  autoComplete: PropTypes.string,
  borderClass: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  floatingLabel: PropTypes.string.isRequired,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  handleFocus: PropTypes.func,
  helpText: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  options: PropTypes.func,
  readOnly: PropTypes.bool,
  spellCheck: PropTypes.string,
  trailingElement: PropTypes.element,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default FormGroup;
