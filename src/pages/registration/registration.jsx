import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { RegistrationStep1 } from '../../components/registration-step-1/registration-step-1';
import { RegistrationStep2 } from '../../components/registration-step-2/registration-step-2';
import { RegistrationStep3 } from '../../components/registration-step-3/registration-step-3';
import { apiRegistration } from '../../constants/urls';

import './registration.css';

export const Registration = () => {
    const [step, setStep] = useState(1);
    const handleStep = () => {
        setStep(step + 1);
    };
    const newUser = useSelector((state) => state.registration.registration);

    const handleSubmit = (data) => {
        axios
            .post(apiRegistration, {
                ...newUser,
                ...data,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
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
                        return <RegistrationStep3 onSubmitForm={handleSubmit} />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};
