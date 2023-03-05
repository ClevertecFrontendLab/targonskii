import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import arrow from '../../assets/images/arrow-reg.svg';
import { apiLogin } from '../../constants/urls';

import './auth.css';

export const Auth = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState('password');

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
                console.log(response);
                console.log(Cookies.get('token'));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='auth-layout'>
            <h3>Cleverland</h3>
            <form className='auth-layout__form' action='' onSubmit={handleSubmit(onSubmit)}>
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
                        {...register('password', {
                            required: 'Неверный логин или пароль!',
                        })}
                    />
                    <span className='auth__placeholder'>Пароль</span>
                    <button
                        aria-label='auth__show-password'
                        type='button'
                        className={classNames('auth__button--show-password', { show: showPassword })}
                        onClick={handleShowPassword}
                    />
                </div>
                <div>
                    {errors?.login ? (
                        <React.Fragment>
                            <p className='auth__error'>{errors?.login.message || errors?.password.message}</p>
                            <NavLink to='/forgot-pass'>
                                <p className='auth__forgot-password'>Восстановить?</p>
                            </NavLink>
                        </React.Fragment>
                    ) : (
                        <NavLink to='/forgot-pass'>
                            <p className='auth__forgot-password'>Забыли логин или пароль?</p>
                        </NavLink>
                    )}
                </div>
                <button className='auth__button--submit' type='submit'>
                    ВХОД
                </button>
                <div className='auth__registration'>
                    <span>Нет учётной записи?</span>
                    <NavLink to='/registration'>
                        Регистрация
                        <img src={arrow} alt='arrow' />
                    </NavLink>
                </div>
            </form>
        </div>
    );
};
