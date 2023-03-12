import React from 'react';
import classNames from 'classnames';

export const InputPassword = ({ form, showPassword, inputName }) => {
    const {
        register,
        formState: { errors },
    } = form();

    const hasError = errors.inputName;

    const hasRequiredError = hasError && errors.inputName.types.required;
    const hasDigitError = hasError && errors.inputName.types.hasDigit;
    const hasCapitalLetterError = hasError && errors.inputName.types.hasCapitalLetter;
    const hasMinLengthError = hasError && errors.inputName.types.minLength;
    const hasPassFieldErrors = hasMinLengthError || hasDigitError || hasCapitalLetterError;

    return (
        <React.Fragment>
            <input
                name={inputName}
                type={showPassword ? 'text' : 'password'}
                required={true}
                className={errors?.inputName ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                {...register(inputName, {
                    required: 'Поле не может быть пустым',
                    minLength: { value: 8 },
                    validate: {
                        hasDigit: (v) => Boolean(v.match(/\d/g)),
                        hasCapitalLetter: (v) => Boolean(v.match(/[A-Z]/g)),
                    },
                })}
            />
            {hasRequiredError ? (
                <span data-test-id='hint' className='auth__error'>
                    {errors?.inputName?.message}
                </span>
            ) : (
                <span
                    data-test-id='hint'
                    className={classNames('registration__hint', {
                        hasErrors: hasPassFieldErrors,
                    })}
                >
                    Пароль <span className={hasMinLengthError && 'isError'}>не менее 8 символов</span>, c{' '}
                    <span className={hasCapitalLetterError && 'isError'}>заглавной буквой</span> и{' '}
                    <span className={hasDigitError && 'isError'}>цифрой</span>
                </span>
            )}
        </React.Fragment>
    );
};
