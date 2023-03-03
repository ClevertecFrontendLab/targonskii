import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';

import './auth.css';

export const Auth = () => {
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
        console.log(data);
    };

    const handleShowPassword = (event) => {
        event.preventDefault();
        if (type === 'password') {
            setType('text');
            setShowPassword(!showPassword);
        }
        setType('password');
        setShowPassword(!showPassword);
    };

    return (
        <div className='auth'>
            <h3>Cleverland</h3>
            <form className='auth__form' action='' onSubmit={handleSubmit(onSubmit)}>
                <h4>Вход в личный кабинет</h4>
                <div className='auth__div-input'>
                    <input
                        className={errors?.login ? 'auth__input-error' : 'auth__input'}
                        {...register('login', {
                            required: 'Неверный логин или пароль!',
                        })}
                    />
                    <span className='auth__placeholder'>Логин</span>
                </div>
                <div className='auth__div-input auth__input-password'>
                    <input
                        className={errors?.password ? 'auth__input-error' : 'auth__input'}
                        type={type}
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
