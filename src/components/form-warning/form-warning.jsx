import classNames from 'classnames';

import './form-warning.css';

export const FormWarning = ({ requestStatus, showStatus }) => (
    <div className={classNames('form-warning', { 'server-error': showStatus })}>
        <h4>{requestStatus.title}</h4>
        <p>{requestStatus.info}</p>
        <button className='auth__button--submit' type='submit' onClick={requestStatus.onClick}>
            {requestStatus.buttonText}
        </button>
    </div>
);
