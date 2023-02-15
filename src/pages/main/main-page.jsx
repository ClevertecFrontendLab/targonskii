import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Aside } from '../../components/aside/aside.jsx';
import { BooksList } from '../../components/books-list/books-list.jsx';
import { BooksMenu } from '../../components/books-menu/books-menu.jsx';
import { BooksSquare } from '../../components/books-square/books-square.jsx';
import { Error } from '../../components/error/error.jsx';
import { Loading } from '../../components/loading/loading.jsx';
import { fetchBook } from '../../redux/book/book-slice.js';
import { fetchBooks } from '../../redux/books-list/books-list-slice.js';
import { fetchCategories } from '../../redux/categories/categories-slice.js';

import './main-page.css';

export const MainPage = () => {
  const dispatch = useDispatch();
  const [viewBooks, setViewBooks] = useState(true);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCategories());
    fetchBook(5);
  }, [dispatch]);

  const { status, error } = useSelector((state) => state.bookList);
  const books = useSelector((state) => state.bookList.booksList);
  const categories = useSelector((state) => state.categories.categories);
  const bookCard = useSelector((state) => state.book.book);
  console.log(bookCard);

  return (
    <main>
      <div className='main-page'>
        <Aside categories={categories} />
        {status === 'loading' || null ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <div className='main-page__books'>
            <BooksMenu viewBooks={viewBooks} setViewBooks={setViewBooks} />
            {viewBooks ? (
              <BooksSquare books={books} categories={categories} />
            ) : (
              <BooksList books={books} categories={categories} />
            )}
          </div>
        )}
      </div>
    </main>
  );
};
