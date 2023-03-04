import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';

export const RegistrationStep2 = ({ onClick }) => {
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

    const handleStep = () => onClick();

    return (
        <form className='registration__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4>Регистрация</h4>
            <h5>2 шаг из 3</h5>
            <div className='registration__input'>
                <input
                    {...register('firstName', {
                        required: 'Поле не может быть пустым',
                    })}
                />
                <span className='registration__placeholder'>Имя</span>
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    {...register('lastName', {
                        required: 'Поле не может быть пустым',
                    })}
                />
                <span className='registration__placeholder'>Фамилия</span>
            </div>
            <button type='submit' disabled={!isValid} onClick={handleStep}>
                ПОСЛЕДНИЙ ШАГ
            </button>
            <div className='registration__registration'>
                <span>Есть учётная запись?</span>
                <NavLink to='/auth'>
                    Войти
                    <img src={arrow} alt='arrow' />
                </NavLink>
            </div>
        </form>
    );
};
