import { forwardRef } from 'react';

import './review-modal.css';

export const ReviewModal = forwardRef(({ setIsShow, isShow }, ref) => {
    // const closeReviewModal = (prev) => onClick(!prev);

    const closeReviewModal = (e) => {
        e.stopPropagation();
        setIsShow(!isShow);
        e.preventDefault();
    };

    return (
        <div className='review-modal__wrapper'>
            <div ref={ref} className='review-modal'>
                <button
                    className='review-modal__button-close'
                    aria-label='close-review-modal'
                    type='button'
                    onClick={closeReviewModal}
                />
                <h4>Оцените книгу</h4>
                <p>Ваша оценка</p>
                <div className='review-modal__rating'>rating</div>
                <textarea type='text' placeholder='Комментарий' />
                <button className='review-modal__button-submit' type='submit'>
                    Оценить
                </button>
            </div>
        </div>
    );
});
