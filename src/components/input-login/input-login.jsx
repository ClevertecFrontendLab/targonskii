import React from 'react';
import classNames from 'classnames';

export const InputLogin = ({ form }) => {
    const {
        register,
        formState: { errors },
    } = form();

    const hasErrorLogin = errors.username;

    const hasRequiredErrorLogin = hasErrorLogin && errors.username.types.required;
    const hasDigitErrorLogin = hasErrorLogin && errors.username.types.hasDigit;
    const hasLetterErrorLogin = hasErrorLogin && errors.username.types.hasLetter;
    const hasLoginFieldErrors = hasDigitErrorLogin || hasLetterErrorLogin;

    return (
        <React.Fragment>
            <input
                name='username'
                required={true}
                className={errors?.username ? 'auth__input-error' : 'auth__input'}
                {...register('username', {
                    required: 'Поле не может быть пустым',
                    validate: {
                        hasDigit: (v) => Boolean(v.match(/\d/g)),
                        hasLetter: (v) => Boolean(v.match(/[a-zA-Z]/g)),
                    },
                })}
            />
            {hasRequiredErrorLogin ? (
                <span data-test-id='hint' className='auth__error'>
                    {errors?.username?.message}
                </span>
            ) : (
                <span
                    data-test-id='hint'
                    className={classNames('registration__hint', {
                        hasErrors: hasLoginFieldErrors,
                    })}
                >
                    Используйте для логина <span className={hasLetterErrorLogin && 'isError'}>латинский алфавит</span> и{' '}
                    <span className={hasDigitErrorLogin && 'isError'}>цифры</span>
                </span>
            )}
        </React.Fragment>
    );
};
