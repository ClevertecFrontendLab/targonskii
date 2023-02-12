import { Link } from 'react-router-dom';

import { BookCardSquare } from '../book-card-square/book-card-square.jsx';

import './books-square.css';

export const BooksSquare = ({ books }) => (
  <div className='books-square'>
    {books.map((book) => (
      <Link data-test-id='card' key={book.id} to={`/books/${book.categories[0]}/${book.id}`}>
        <BookCardSquare book={book} key={book.id} />
      </Link>
    ))}
  </div>
);
