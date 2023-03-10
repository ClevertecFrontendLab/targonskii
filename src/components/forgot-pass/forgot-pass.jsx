import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import arrowAuth from '../../assets/images/arrow-forget.svg';
import arrowReg from '../../assets/images/arrow-reg.svg';
import { apiForgotPassword } from '../../constants/urls';
import { Loading } from '../loading/loading.jsx';

import '../../assets/styles/auth-layout.css';
import '../../pages/forgot-password/forgot-password.css';

export const ForgotPass = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        setIsLoading(true);

        axios
            .post(apiForgotPassword, { ...data })
            .then((response) => {
                if (response.data.ok) {
                    setShowStatus(true);
                }
            })
            .catch((error) => {
                console.log(error.response.status);
            })
            .finally(() => setIsLoading(false));
    };

    return isLoading ? (
        <Loading />
    ) : (
        <form data-test-id='send-email-form' action='' onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames('forgot-pass-layout__form', { 'server-response': showStatus })}>
                <div className='forgot-pass__auth'>
                    <Link to='/auth'>
                        <img src={arrowAuth} alt='arrowAuth' />
                        <span>ВХОД В ЛИЧНЫЙ КАБИНЕТ</span>
                    </Link>
                </div>
                <div className='forgot-pass__form'>
                    <div className='forgot-pass__div-input'>
                        <h4 className='forgot-pass__title'>Восстановление пароля</h4>
                        <input
                            name='email'
                            className={errors?.email ? 'forgot-pass__input-error' : 'forgot-pass__input'}
                            required={true}
                            {...register('email', {
                                required: 'Поле не может быть пустым',
                                pattern: {
                                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                    message: 'Введите корректный e-mail',
                                },
                            })}
                        />
                        <span className='forgot-pass__placeholder'>Email</span>
                        {errors?.email && (
                            <span data-test-id='hint' className='forgot-pass__error'>
                                {errors?.email.message}
                            </span>
                        )}
                        <p className='forgot-pass__hint'>
                            На это email будет отправлено письмо с инструкциями по восстановлению пароля
                        </p>
                    </div>
                    <button className='forgot-pass__button--submit' type='submit'>
                        ВОССТАНОВИТЬ
                    </button>
                    <div className='forgot-pass__registration'>
                        <span>Нет учётной записи?</span>
                        <Link to='/registration'>
                            РЕГИСТРАЦИЯ
                            <img src={arrowReg} alt='arrowReg' />
                        </Link>
                    </div>
                </div>
            </div>
            {showStatus && (
                <div data-test-id='status-block' className='form-warning'>
                    <h4>Письмо выслано</h4>
                    <p>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
                </div>
            )}
            {/* <div data-test-id='status-block' className={classNames('form-warning', { 'server-error': showStatus })}>
                <h4>Письмо выслано</h4>
                <p>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
            </div> */}
        </form>
    );
};
