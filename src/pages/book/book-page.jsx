import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Aside } from '../../components/aside/aside';
import { BookPageDescription } from '../../components/book-page-description/book-page-description';
import { Error } from '../../components/error/error.jsx';
import { Loading } from '../../components/loading/loading.jsx';
import { ReviewModal } from '../../components/review-modal/review-modal';
import { useCategoryByPath } from '../../hooks/useCategoryByPath';
import { useOutside } from '../../hooks/useOutside';
import { fetchBook } from '../../redux/book/book-slice';

import './book-page.css';

import 'swiper/css';
import 'swiper/css/pagination';

export const BookPage = () => {
    const { ref, isShow, setIsShow } = useOutside(false);

    const dispatch = useDispatch();
    const { genre, id } = useParams();
    // const [reviewModal, setReviewModal] = useState(false);

    const { status, error } = useSelector((state) => state.book);
    const bookCard = useSelector((state) => state.book.book);
    const categories = useSelector((state) => state.categories.categories);

    const getCategory = useCategoryByPath;
    const category = getCategory(genre);

    useEffect(() => {
        dispatch(fetchBook(id));
    }, [dispatch, id]);

    // const handleSetReviewModal = () => {
    //     setReviewModal(!reviewModal);
    // };

    return (
        <main>
            <Aside categories={categories} />
            {status === 'loading' || !status ? (
                <Loading />
            ) : error ? (
                <React.Fragment>
                    <Error />
                    <div className='book-page__path'>
                        <span>{category} книги</span>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <BookPageDescription bookCard={bookCard} setIsShow={setIsShow} />
                    {isShow && <ReviewModal isShow={isShow} setIsShow={setIsShow} ref={ref} />}
                </React.Fragment>
            )}
        </main>
    );
};
