import { Link } from 'react-router-dom';

import { useCategoryByName } from '../../hooks/useCategoryByName.js';
import { BookCardSquare } from '../book-card-square/book-card-square.jsx';

import './books-square.css';

export const BooksSquare = ({ books, searchStr }) => {
    const getCategory = useCategoryByName;

    console.log('Search String', searchStr);

    return (
        <div className='books-square'>
            {books
                .filter((book) => book.title.toLowerCase().includes(searchStr.toLowerCase()))
                .map((book) => (
                    <Link data-test-id='card' key={book.id} to={`/books/${getCategory(book.categories)}/${book.id}`}>
                        <BookCardSquare book={book} key={book.id} />
                    </Link>
                ))}
        </div>
    );
};
