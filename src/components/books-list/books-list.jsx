import { Link } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { BookCardList } from '../book-card-list/book-card-list.jsx';

import './books-list.css';

export const BooksList = ({ books }) => {
    const getCategory = useCategoryByName;

    return (
        <div className='books-list'>
            {books.map((book) => (
                <Link data-test-id='card' key={book.id} to={`/books/${getCategory(book.categories)}/${book.id}`}>
                    <BookCardList book={book} key={book.id} />
                </Link>
            ))}
        </div>
    );
};
