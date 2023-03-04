import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';

export const RegistrationStep3 = () => {
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
        <form className='registration__form' action='' onSubmit={handleSubmit(onSubmit)}>
            <h4>Регистрация</h4>
            <h5>3 шаг из 3</h5>
            <div className='registration__input'>
                <MaskedInput
                    type='tel'
                    mask={['+375', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    {...register('phoneNumber', {
                        required: 'В формате +375 (xx) xxx-xx-xx',
                    })}
                />
                <span className='registration__placeholder'>Номер телефона</span>
            </div>
            <div className='registration__input registration__input-password'>
                <input
                    type='email'
                    {...register('email', {
                        required: 'Введите корректный e-mail',
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                />
                <span className='registration__placeholder'>E-mail</span>
            </div>
            <button type='submit' disabled={!isValid}>
                ЗАРЕГИСТРИРОВАТЬСЯ
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
