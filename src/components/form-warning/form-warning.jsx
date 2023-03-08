import classNames from 'classnames';

import './form-warning.css';

export const FormWarning = ({ status }) => (
    <div className={classNames('form-warning', { 'server-error': !!status })}>
        <h4>{status.title}</h4>
        <p>{status.info}</p>
        <button className='auth__button--submit' type='submit'>
            {status.buttonText}
        </button>
    </div>
);
