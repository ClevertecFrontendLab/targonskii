/* eslint-disable complexity */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';
import greenMark from '../../assets/images/green-mark.svg';
import { setRegistration } from '../../redux/registration/registration-slice';

import '../../assets/styles/auth-layout.css';

export const RegistrationStep1 = ({ onClick }) => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        getFieldState,
    } = useForm({
        mode: 'all',
        criteriaMode: 'all',
        resetOptions: {
            keepErrors: true,
        },
    });

    const hasErrorLogin = errors.username;

    const hasRequiredErrorLogin = hasErrorLogin && errors.username.types.required;
    const hasDigitErrorLogin = hasErrorLogin && errors.username.types.hasDigitErrorLogin;
    const hasLetterErrorLogin = hasErrorLogin && errors.username.types.hasLetterErrorLogin;
    const hasLoginFieldErrors = hasDigitErrorLogin || hasLetterErrorLogin;

    const hasError = errors.password;

    const hasRequiredError = hasError && errors.password.types.required;
    const hasDigitError = hasError && errors.password.types.hasDigit;
    const hasCapitalLetterError = hasError && errors.password.types.hasCapitalLetter;
    const hasMinLengthError = hasError && errors.password.types.minLength;
    const hasPassFieldErrors = hasMinLengthError || hasDigitError || hasCapitalLetterError;

    const handleStep = () => onClick();

    const onSubmit = (data) => {
        handleStep();
        dispatch(setRegistration(data));
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <form data-test-id='register-form' className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4 className='registration__title'>??????????????????????</h4>
            <h5>1 ?????? ???? 3</h5>
            <div className='registration__input'>
                <input
                    name='username'
                    type='text'
                    required={true}
                    className={errors?.username ? 'auth__input-error' : 'auth__input'}
                    {...register('username', {
                        validate: {
                            required: (v) =>
                                v.length !== 0 || getFieldState('username').isDirty || '???????? ???? ?????????? ???????? ????????????',
                            hasDigitErrorLogin: (v) => Boolean(v.match(/\d/g)),
                            hasLetterErrorLogin: (v) => Boolean(v.match(/[a-zA-Z]/g)),
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
                        ?????????????????????? ?????? ????????????{' '}
                        <span className={hasLetterErrorLogin && 'isError'}>?????????????????? ??????????????</span> ??{' '}
                        <span className={hasDigitErrorLogin && 'isError'}>??????????</span>
                    </span>
                )}
                <span className='registration__placeholder'>???????????????????? ?????????? ?????? ??????????</span>
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    required={true}
                    className={errors?.password ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                    {...register('password', {
                        minLength: { value: 8 },
                        validate: {
                            required: (v) =>
                                v.length !== 0 || getFieldState('password').isDirty || '???????? ???? ?????????? ???????? ????????????',
                            hasDigit: (v) => Boolean(v.match(/\d/g)),
                            hasCapitalLetter: (v) => Boolean(v.match(/[A-Z]/g)),
                        },
                    })}
                />
                <span className='registration__placeholder'>????????????</span>
                {hasRequiredError ? (
                    <span data-test-id='hint' className='auth__error'>
                        {errors?.password?.message}
                    </span>
                ) : (
                    <span
                        data-test-id='hint'
                        className={classNames('registration__hint', {
                            hasErrors: hasPassFieldErrors,
                        })}
                    >
                        ???????????? <span className={hasMinLengthError && 'isError'}>???? ?????????? 8 ????????????????</span>, ??{' '}
                        <span className={hasCapitalLetterError && 'isError'}>?????????????????? ????????????</span> ??{' '}
                        <span className={hasDigitError && 'isError'}>????????????</span>
                    </span>
                )}
                {!errors?.password && getFieldState('password').isDirty && (
                    <img
                        data-test-id='checkmark'
                        className='reg-pass__green-mark-show'
                        src={greenMark}
                        alt='green-mark'
                    />
                )}
                <button
                    data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
                    aria-label='auth__show-password'
                    type='button'
                    className={classNames('auth__button--show-password', { show: showPassword })}
                    onClick={handleShowPassword}
                />
            </div>
            <button className='registration__button' type='submit' disabled={!isValid}>
                ?????????????????? ??????
            </button>
            <div className='registration__registration'>
                <span>???????? ?????????????? ?????????????</span>
                <NavLink to='/auth'>
                    ??????????
                    <img src={arrow} alt='arrow' />
                </NavLink>
            </div>
        </form>
    );
};
