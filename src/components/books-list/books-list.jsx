import { Link } from 'react-router-dom';

// import { books } from '../../constants/booksList.js';
import { BookCardList } from '../book-card-list/book-card-list.jsx';

import './books-list.css';

export const BooksList = ({ books }) => (
  <div className='books-list'>
    {books.map((book) => (
      <Link key={book.id} to={`/books/${book.genre}/${book.id}`}>
        <BookCardList book={book} key={book.id} />
      </Link>
    ))}
  </div>
);
