import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { BookCardSquare } from '../book-card-square/book-card-square.jsx';
import { PaintFilter } from '../paint-filter/paint-filter.jsx';

import './books-square.css';

export const BooksSquare = ({ books, searchStr, rating, chosenCategory }) => {
    // const getCategory = useCategoryByName;
    const categories = useCategoryByName();

    const paint = useCallback((string) => <PaintFilter filter={searchStr} string={string} />, [searchStr]);

    console.log('Search String', searchStr);
    console.log('chosenCategory', chosenCategory);

    return (
        <div className='books-square'>
            {books
                .filter((book) => book.title.toLowerCase().includes(searchStr.toLowerCase()))
                .filter((book) => book.categories.find((elem) => elem === chosenCategory))
                .sort((a, b) => {
                    if (rating) {
                        return a.rating - b.rating;
                    }

                    return b.rating - a.rating;
                })
                .map((book) => (
                    <Link data-test-id='card' key={book.id} to={`/books/${categories[book.categories]}/${book.id}`}>
                        <BookCardSquare book={book} key={book.id} />
                    </Link>
                ))}
        </div>
    );
};
