/* eslint-disable complexity */
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import greenMark from '../../assets/images/green-mark.svg';
import { STATUS_RESET_PASSWORD } from '../../constants/responce-status';
import { useResetRequest } from '../../hooks/useResetRequest';
import { FormWarning } from '../form-warning/form-warning';
import { Loading } from '../loading/loading.jsx';

import '../../assets/styles/auth-layout.css';
import '../../pages/forgot-password/forgot-password.css';
import './reset-pass.css';

export const ResetPass = ({ code }) => {
    const navigate = useNavigate();
    const [fieldFocus, setFieldFocus] = useState(false);
    const [fieldError, setFieldError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    const { resetRequest, isLoading, responseStatus } = useResetRequest();

    const {
        register,
        watch,
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

    const hasError = errors.password;

    const hasRequiredError = hasError && errors.password.types.required;
    const hasDigitError = hasError && errors.password.types.hasDigit;
    const hasCapitalLetterError = hasError && errors.password.types.hasCapitalLetter;
    const hasMinLengthError = hasError && errors.password.types.minLength;
    const hasPassFieldErrors = hasMinLengthError || hasDigitError || hasCapitalLetterError;

    const hasErrorPassConf = errors.passwordConfirmation;

    const hasRequiredErrorPassConf = hasErrorPassConf && errors.passwordConfirmation?.types?.required;
    const hasDigitErrorPassConf = hasErrorPassConf && errors.passwordConfirmation?.types?.hasDigit;
    const hasCapitalLetterErrorPassConf = hasErrorPassConf && errors.passwordConfirmation?.types?.hasCapitalLetter;
    const hasMinLengthErrorPassConf = hasErrorPassConf && errors.passwordConfirmation?.types?.minLength;
    const hasPassConfFieldErrors =
        hasMinLengthErrorPassConf || hasCapitalLetterErrorPassConf || hasRequiredErrorPassConf;

    const isPasswordsSame = watch('passwordConfirmation') === watch('password');

    const toAuth = () => navigate('/auth');
    const toReg = () => window.location.reload();

    const onClickForm = () => {
        switch (responseStatus) {
            case 200:
                return toAuth;
            case 400:
                return toReg;
            default:
                return null;
        }
    };

    const getModalStatus = () => {
        switch (responseStatus) {
            case 200:
                return STATUS_RESET_PASSWORD[200];
            case 400:
                return STATUS_RESET_PASSWORD[400];
            default:
                return STATUS_RESET_PASSWORD.default;
        }
    };

    const onSubmit = (data) => resetRequest(data, code);

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfPassword = () => setShowConfPassword(!showConfPassword);

    return isLoading ? (
        <Loading />
    ) : (
        <form data-test-id='reset-password-form' action='' onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames('reset-pass-layout__form', { 'server-response': !!responseStatus })}>
                <div className='reset-pass__form'>
                    <div className='reset-pass__div-input'>
                        <h4 className='reset-pass__title'>???????????????????????????? ????????????</h4>
                        <input
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            required={true}
                            className={errors?.password ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                            {...register('password', {
                                minLength: { value: 8 },
                                validate: {
                                    required: (v) =>
                                        v.length !== 0 ||
                                        getFieldState('password').isDirty ||
                                        '???????? ???? ?????????? ???????? ????????????',
                                    hasDigit: (v) => Boolean(v.match(/\d/g)),
                                    hasCapitalLetter: (v) => Boolean(v.match(/[A-Z]/g)),
                                },
                            })}
                        />
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
                        {!getFieldState('password').invalid && getFieldState('password').isDirty && (
                            <img
                                data-test-id='checkmark'
                                className='reset-pass__green-mark-show'
                                src={greenMark}
                                alt='green-mark'
                            />
                        )}
                        <span className='forgot-pass__placeholder'>?????????? ????????????</span>
                        <button
                            data-test-id={showPassword ? 'eye-opened' : 'eye-closed'}
                            aria-label='reset__button-password'
                            type='button'
                            className={classNames('reset__button--show-password', { show: showPassword })}
                            onClick={handleShowPassword}
                        />
                    </div>
                    <div className='reset-pass-conf__div-input'>
                        <input
                            name='passwordConfirmation'
                            type={showConfPassword ? 'text' : 'password'}
                            required={true}
                            className={errors?.passwordConfirmation ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                            {...register('passwordConfirmation', {
                                required: '???????? ???? ?????????? ???????? ????????????',
                                minLength: { value: 8 },
                                validate: {
                                    hasDigit: (v) => Boolean(v.match(/\d/g)),
                                    hasCapitalLetter: (v) => Boolean(v.match(/[A-Z]/g)),
                                },
                            })}
                            onBlur={(e) => {
                                setFieldFocus(true);
                                console.log(e.target.value);
                                if (e.target.value === '') {
                                    setFieldError('???????? ???? ?????????? ???????? ????????????');
                                }
                            }}
                            onFocus={() => setFieldFocus(false)}
                        />
                        {hasRequiredErrorPassConf ||
                        (fieldError && !watch('passwordConfirmation')) ||
                        (fieldFocus && !isPasswordsSame && getFieldState('passwordConfirmation').isDirty) ? (
                            <span data-test-id='hint' className='auth__error'>
                                {errors?.passwordConfirmation?.types?.required ||
                                    (!watch('passwordConfirmation') && fieldError && '???????? ???? ?????????? ???????? ????????????') ||
                                    (fieldFocus && !isPasswordsSame && '???????????? ???? ??????????????????')}
                            </span>
                        ) : (
                            <span
                                data-test-id='hint'
                                className={classNames('registration__hint', {
                                    hasErrorPassConf: hasPassConfFieldErrors,
                                })}
                            >
                                ????????????{' '}
                                <span className={hasMinLengthErrorPassConf && 'isError'}>???? ?????????? 8 ????????????????</span>, ??{' '}
                                <span className={hasCapitalLetterErrorPassConf && 'isError'}>?????????????????? ????????????</span> ??{' '}
                                <span className={hasDigitErrorPassConf && 'isError'}>????????????</span>
                            </span>
                        )}
                        <span className='reset-pass-conf__placeholder'>?????????????????? ????????????</span>
                        <button
                            data-test-id={showConfPassword ? 'eye-opened' : 'eye-closed'}
                            aria-label='reset__button-conf-password'
                            type='button'
                            className={classNames('reset__button-conf-password', { show: showConfPassword })}
                            onClick={handleShowConfPassword}
                        />
                    </div>
                    <button className='forgot-pass__button--submit' type='submit' disabled={!isValid}>
                        ?????????????????? ??????????????????
                    </button>
                    <p className='reset-pass__info'>?????????? ???????????????????? ?????????????? ?? ????????????????????, ?????????????????? ?????????? ????????????</p>
                </div>
            </div>
            {responseStatus && <FormWarning status={getModalStatus()} action={onClickForm()} />}
        </form>
    );
};
