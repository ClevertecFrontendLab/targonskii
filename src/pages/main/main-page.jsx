import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Aside } from '../../components/aside/aside.jsx';
import { BooksList } from '../../components/books-list/books-list.jsx';
import { BooksMenu } from '../../components/books-menu/books-menu.jsx';
import { BooksSquare } from '../../components/books-square/books-square.jsx';
import { Error } from '../../components/error/error.jsx';
import { Loading } from '../../components/loading/loading.jsx';
import { fetchBooks } from '../../redux/books-list/books-list-slice.js';
import { fetchCategories } from '../../redux/categories/categories-slice.js';

import './main-page.css';

export const MainPage = () => {
    const dispatch = useDispatch();
    const [viewBooks, setViewBooks] = useState(true);
    const [searchStr, setSearchStr] = useState('');
    const [rating, setRating] = useState(false);
    const [chosenCategory, setChosenCategory] = useState({});

    useEffect(() => {
        dispatch(fetchBooks());
        dispatch(fetchCategories());
    }, [dispatch]);

    const { status, error } = useSelector((state) => state.bookList);
    const books = useSelector((state) => state.bookList.booksList);
    const statusCategories = useSelector((state) => state.categories.status);
    const errorCategories = useSelector((state) => state.categories.error);
    const categories = useSelector((state) => state.categories.categories);

    const listCategory = books.reduce((acc, elem) => {
        if (elem.categories.length === 1) {
            acc[elem.categories] = (acc[elem.categories] || 0) + 1;
        } else {
            acc[elem.categories[0]] = (acc[elem.categories[0]] || 0) + 1;
            acc[elem.categories[1]] = (acc[elem.categories[1]] || 0) + 1;
        }

        return acc;
    }, {});

    const handleSearchStr = (search) => {
        setSearchStr(search);
    };

    const handleSetRating = () => {
        setRating(!rating);
    };

    const handleSetCategory = (category) => {
        setChosenCategory(category);
    };

    return (
        <main>
            <div className='main-page'>
                {status === 'loading' || !status || statusCategories === 'loading' || !statusCategories ? (
                    <Loading />
                ) : error || errorCategories ? (
                    <React.Fragment>
                        <Error />
                        <Aside categories={null} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Aside categories={categories} listCategory={listCategory} onClick={handleSetCategory} />
                        <div className='main-page__books'>
                            <BooksMenu
                                viewBooks={viewBooks}
                                setViewBooks={setViewBooks}
                                onChange={handleSearchStr}
                                onClick={handleSetRating}
                                rating={rating}
                            />
                            {viewBooks ? (
                                <BooksSquare
                                    books={books}
                                    searchStr={searchStr}
                                    rating={rating}
                                    chosenCategory={chosenCategory}
                                />
                            ) : (
                                <BooksList books={books} searchStr={searchStr} rating={rating} />
                            )}
                        </div>
                    </React.Fragment>
                )}
            </div>
        </main>
    );
};
