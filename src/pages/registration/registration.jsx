import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';

import './registration.css';

export const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState('password');

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className='registration'>
            <h3>Cleverland</h3>
            <form className='registration__form' action='' onSubmit={handleSubmit(onSubmit)}>
                <h4>Регистрация</h4>
                <h5>1 шаг из 3</h5>
                <div className='registration__input'>
                    <input
                        {...register('login', {
                            required: 'Поле не может быть пустым',
                            pattern: /^[A-Za-z0-9]+$/,
                        })}
                    />
                    <span className='registration__placeholder'>Придумайте логин для входа</span>
                    <span className='registration__hint'>Используйте для логина латинский алфавит и цифры</span>
                </div>
                <div className='registration__input registration__input-password'>
                    <input
                        type='password'
                        {...register('password', {
                            required: 'Поле не может быть пустым',
                            minLength: { value: 8, message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' },
                            pattern: /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        })}
                    />
                    <span className='registration__placeholder'>Пароль</span>
                    <span className='registration__hint'>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
                </div>
                <button type='submit' disabled={!isValid}>
                    СЛЕДУЮЩИЙ ШАГ
                </button>
                <div className='registration__registration'>
                    <span>Есть учётная запись?</span>
                    <NavLink to='/auth'>
                        Войти
                        <img src={arrow} alt='arrow' />
                    </NavLink>
                </div>
            </form>
        </div>
    );
};
