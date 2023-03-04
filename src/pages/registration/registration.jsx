import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/images/arrow-reg.svg';
import { RegistrationStep1 } from '../../components/registration-step-1/registration-step-1';
import { RegistrationStep2 } from '../../components/registration-step-2/registration-step-2';
import { RegistrationStep3 } from '../../components/registration-step-3/registration-step-3';

import './registration.css';

export const Registration = () => {
    const [step, setStep] = useState(1);
    const handleStep = () => {
        setStep(step + 1);
    };

    return (
        <div className='registration'>
            <h3>Cleverland</h3>
            {(() => {
                switch (step) {
                    case 1:
                        return <RegistrationStep1 onClick={handleStep} />;
                    case 2:
                        return <RegistrationStep2 onClick={handleStep} />;
                    case 3:
                        return <RegistrationStep3 />;
                    default:
                        return null;
                }
            })()}
        </div>
    );
};
