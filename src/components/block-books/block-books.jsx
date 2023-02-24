import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { BooksError } from '../books-error/books-error.jsx';
import { BooksList } from '../books-list/books-list.jsx';
import { BooksMenu } from '../books-menu/books-menu.jsx';
import { BooksSquare } from '../books-square/books-square.jsx';

export const BlockBooks = () => {
    const { genre } = useParams();

    const [viewBooks, setViewBooks] = useState(true);
    const [searchStr, setSearchStr] = useState('');
    const [rating, setRating] = useState(false);

    const books = useSelector((state) => state.bookList.booksList);

    const handleSearchStr = (search) => {
        setSearchStr(search);
    };

    const handleSetRating = () => {
        setRating(!rating);
    };

    const categoriesByName = useCategoryByName();

    const searchFilter = books.filter((book) => book.title.toLowerCase().includes(searchStr.toLowerCase()));
    const categoryFilter = searchFilter.filter((book) =>
        genre === 'all' ? true : book.categories.find((category) => category.includes(categoriesByName[genre]))
    );
    const filteredBooks = categoryFilter.sort((nextBook, currBook) => {
        if (rating) return nextBook.rating - currBook.rating;

        return currBook.rating - nextBook.rating;
    });

    const noMatchError = 'По запросу ничего не найдено';
    const emptyCategoryError = 'В этой категории книг еще нет';

    // const filteredBooks = books
    //     .filter((book) => book.title.toLowerCase().includes(searchStr.toLowerCase()))
    //     .filter((book) =>
    //         genre === 'all' ? true : book.categories.find((category) => category.includes(categoriesByName[genre]))
    //     )
    //     .sort((nextBook, currBook) => {
    //         if (rating) return nextBook.rating - currBook.rating;

    //         return currBook.rating - nextBook.rating;
    //     });

    return (
        <React.Fragment>
            <BooksMenu
                viewBooks={viewBooks}
                setViewBooks={setViewBooks}
                onChange={handleSearchStr}
                onClick={handleSetRating}
                rating={rating}
            />
            {searchFilter.length === 0 ? (
                <div className='books__error' data-test-id='search-result-not-found'>
                    <span>{noMatchError}</span>
                </div>
            ) : categoryFilter.length === 0 ? (
                <div className='books__error' data-test-id='empty-category'>
                    <span>{emptyCategoryError}</span>
                </div>
            ) : viewBooks ? (
                <BooksSquare filteredBooks={filteredBooks} searchStr={searchStr} />
            ) : (
                <BooksList filteredBooks={filteredBooks} />
            )}
            {/* {viewBooks ? <BooksSquare filteredBooks={filteredBooks} /> : <BooksList filteredBooks={filteredBooks} />} */}
        </React.Fragment>
    );
};
