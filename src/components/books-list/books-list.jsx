import { Link } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { BookCardList } from '../book-card-list/book-card-list.jsx';

import './books-list.css';

export const BooksList = ({ books, searchStr, rating }) => {
    // const getCategory = useCategoryByName;
    const categories = useCategoryByName();

    const category = 'Детские';

    return (
        <div className='books-list'>
            {books
                .filter((book) => book.title.toLowerCase().includes(searchStr.toLowerCase()))
                .filter((book) => book.categories.find((elem) => elem === category))
                .sort((a, b) => {
                    if (rating) {
                        return a.rating - b.rating;
                    }

                    return b.rating - a.rating;
                })
                .map((book) => (
                    <Link data-test-id='card' key={book.id} to={`/books/${categories[book.categories]}/${book.id}`}>
                        <BookCardList book={book} key={book.id} />
                    </Link>
                ))}
        </div>
    );
};
