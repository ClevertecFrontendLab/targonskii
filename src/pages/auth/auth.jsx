import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import arrow from '../../assets/images/arrow-reg.svg';
import { FormWarning } from '../../components/form-warning/form-warning';
import { apiLogin } from '../../constants/urls';

import './auth.css';

const requestStatus = {
    title: 'Вход не выполнен',
    info: 'Что-то пошло не так. Попробуйте ещё раз',
    buttonText: 'ПОВТОРИТЬ',
    onClick: () => {},
};

export const Auth = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => {
        axios
            .post(apiLogin, {
                ...data,
            })
            .then((response) => {
                Cookies.set('token', response.data.jwt);
                navigate('/');
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    navigate('/auth');

                    return;
                }
                console.log(error);
                setShowStatus(true);
            });
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className='auth-layout'>
            <h3>Cleverland</h3>
            <form action='' onSubmit={handleSubmit(onSubmit)}>
                <div className={classNames('auth-layout__form', { 'server-error': showStatus })}>
                    <h4 className='auth-layout__title'>Вход в личный кабинет</h4>
                    <div className='auth__div-input'>
                        <input
                            className={errors?.login ? 'auth__input-error' : 'auth__input'}
                            {...register('identifier', {
                                required: 'Неверный логин или пароль!',
                            })}
                        />
                        <span className='auth__placeholder'>Логин</span>
                    </div>
                    <div className='auth__div-input auth__input-password'>
                        <input
                            className={errors?.password ? 'auth__input-error' : 'auth__input'}
                            type={showPassword ? 'text' : 'password'}
                            required={true}
                            {...register('password', {
                                required: 'Неверный логин или пароль!',
                            })}
                        />
                        <button
                            aria-label='auth__show-password'
                            type='button'
                            className={classNames('auth__button--show-password', { show: showPassword })}
                            onClick={handleShowPassword}
                        />
                        <span className='auth__placeholder'>Пароль</span>
                    </div>
                    <div>
                        {errors?.login ? (
                            <React.Fragment>
                                <p className='auth__error'>{errors?.login.message || errors?.password.message}</p>
                                <Link to='/forgot-pass'>
                                    <p className='auth__forgot-password'>Восстановить?</p>
                                </Link>
                            </React.Fragment>
                        ) : (
                            <Link to='/forgot-pass'>
                                <p className='auth__forgot-password'>Забыли логин или пароль?</p>
                            </Link>
                        )}
                    </div>
                    <button className='auth__button--submit' type='submit'>
                        ВХОД
                    </button>
                    <div className='auth__registration'>
                        <span>Нет учётной записи?</span>
                        <Link to='/registration'>
                            Регистрация
                            <img src={arrow} alt='arrow' />
                        </Link>
                    </div>
                </div>
                <FormWarning showStatus={showStatus} requestStatus={requestStatus} />
            </form>
        </div>
    );
};
