import { Link } from 'react-router-dom';

import { useCategoryByPath } from '../../hooks/useCategoryByPath.js';
import { BookCardSquare } from '../book-card-square/book-card-square.jsx';

import './books-square.css';

export const BooksSquare = ({ filteredBooks, searchStr }) => {
    const categories = useCategoryByPath();

    return (
        <div className='books-square'>
            {filteredBooks.map((book) => (
                <Link data-test-id='card' key={book.id} to={`/books/${categories[book.categories[0]]}/${book.id}`}>
                    <BookCardSquare book={book} key={book.id} searchStr={searchStr} />
                </Link>
            ))}
        </div>
    );
};
