import { Link } from 'react-router-dom';

import { BookCardSquare } from '../book-card-square/book-card-square.jsx';

import './books-square.css';

export const BooksSquare = ({ books, categories }) => {
  console.log(categories);

  // categories.find((i) => {
  //   if (categories[i].name === book.categories[0]) {
  //     <Link data-test-id='card' key={book.id} to={`/books/${categories[i].path}/${book.id}`}>
  //       <BookCardSquare book={book} key={book.id} />
  //     </Link>;
  //   }
  // })

  return (
    <div className='books-square'>
      {books.map((book) => (
        <Link data-test-id='card' key={book.id} to={`/books/category/${book.id}`}>
          <BookCardSquare book={book} key={book.id} />
        </Link>
      ))}
    </div>
  );
};
