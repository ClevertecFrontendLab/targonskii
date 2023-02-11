import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { booksList1 } from '../../constants/booksList.js';
import { BookCardSquare } from '../book-card-square/book-card-square.jsx';

import './books-square.css';

export const BooksSquare = () => {
  const books = useSelector((state) => console.log(state.bookList));
  console.log(books);

  return (
    <div className='books-square'>
      {booksList1.map((book) => (
        <Link data-test-id='card' key={book.id} to={`/books/${book.genre}/${book.id}`}>
          <BookCardSquare book={book} key={book.id} />
        </Link>
      ))}
    </div>
  );
};
