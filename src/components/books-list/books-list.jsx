import { Link } from 'react-router-dom';

import { booksList1 } from '../../constants/booksList.js';
import { BookCardList } from '../book-card-list/book-card-list.jsx';

import './books-list.css';

export const BooksList = () => (
  <div className='books-list'>
    {booksList1.map((book) => (
      <Link key={book.id} to={`/books/${book.genre}/${book.id}`}>
        <BookCardList book={book} key={book.id} />
      </Link>
    ))}
  </div>
);
