import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Aside } from '../../components/aside/aside.jsx';
import { BooksList } from '../../components/books-list/books-list.jsx';
import { BooksMenu } from '../../components/books-menu/books-menu.jsx';
import { BooksSquare } from '../../components/books-square/books-square.jsx';
import { fetchBooks } from '../../redux/books-list/books-list-slice.js';

import './main-page.css';

export const MainPage = () => {
  const dispatch = useDispatch();
  const [viewBooks, setViewBooks] = useState(true);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <main>
      <div className='main-page'>
        <Aside />
        <div className='main-page__books'>
          <BooksMenu viewBooks={viewBooks} setViewBooks={setViewBooks} />
          {viewBooks ? <BooksSquare /> : <BooksList />}
        </div>
      </div>
    </main>
  );
};
