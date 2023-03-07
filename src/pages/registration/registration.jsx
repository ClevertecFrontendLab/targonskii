import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FormWarning } from '../../components/form-warning/form-warning';
import { RegistrationStep1 } from '../../components/registration-step-1/registration-step-1';
import { RegistrationStep2 } from '../../components/registration-step-2/registration-step-2';
import { RegistrationStep3 } from '../../components/registration-step-3/registration-step-3';
import { apiRegistration } from '../../constants/urls';

import './registration.css';

export const Registration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [requestStatus, setRequestStatus] = useState(null);
    const [showStatus, setShowStatus] = useState(false);
    const handleStep = () => {
        setStep(step + 1);
    };

    console.log(requestStatus);

    const newUser = useSelector((state) => state.registration.registration);

    const successWarning = {
        title: 'Регистрация успешна',
        info: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
        buttonText: 'ВХОД',
        onClick: () => {
            navigate('/auth');
        },
    };
    const errorWarning = {
        title: 'Данные не сохранились',
        info: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        buttonText: 'ПОВТОРИТЬ',
        onClick: () => {
            // navigate('/registration'); Здесь нужно сделать повторный запрос на сервер.
        },
    };
    const foundUserWarning = {
        title: 'Данные не сохранились',
        info: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
        buttonText: 'НАЗАД К РЕГИСТРАЦИИ',
        onClick: () => {
            // navigate('/registration');
        },
    };

    const handleSubmit = (data) => {
        axios
            .post(apiRegistration, {
                ...newUser,
                ...data,
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Server Error');
                }
                setStep(4);
                setRequestStatus(successWarning);
                setShowStatus(true);

                return response.data;
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setStep(4);
                    setRequestStatus(foundUserWarning);
                    setShowStatus(true);

                    return;
                }
                setStep(4);
                setRequestStatus(errorWarning);
                setShowStatus(true);
                console.log(error);
            });
    };

    return (
        <div className='auth-layout'>
            <h3>Cleverland</h3>
            {(() => {
                switch (step) {
                    case 1:
                        return <RegistrationStep1 onClick={handleStep} />;
                    case 2:
                        return <RegistrationStep2 onClick={handleStep} />;
                    case 3:
                        return <RegistrationStep3 onSubmitForm={handleSubmit} onClick={handleStep} />;
                    case 4:
                        return <FormWarning requestStatus={requestStatus} showStatus={showStatus} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};
