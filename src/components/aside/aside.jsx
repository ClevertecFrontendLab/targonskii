import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import classNames from 'classnames';

import './aside.css';

const countBooksInCategory = (books) =>
    books.reduce((result, { categories }) => {
        if (!categories.length) return result;

        categories.forEach((category) => {
            if (category in result) result[category] += 1;
            else result[category] = 1;
        });

        return result;
    }, {});

export const Aside = ({ categories }) => {
    const [isHide, setIsHide] = useState(true);
    const [ref, isShow] = useOutletContext();
    const burgerWigth = window.innerWidth > 768;
    const location = useLocation();

    const books = useSelector((state) => state.bookList.booksList);
    const valueBooksInCategory = countBooksInCategory(books);

    useEffect(() => {
        if (location.pathname === '/rules' || location.pathname === '/terms') {
            setIsHide(false);
        } else {
            setIsHide(true);
        }
    }, [location.pathname]);

    return (
        <aside data-test-id='burger-navigation' ref={ref} className={classNames('aside', { hide: !isShow })}>
            <h5>
                <NavLink
                    data-test-id={burgerWigth ? 'navigation-showcase' : 'burger-showcase'}
                    to='/books/all'
                    className={classNames('aside__button', { hide: !isHide })}
                    onClick={() => setIsHide(!isHide)}
                >
                    Витрина книг
                </NavLink>
                <div className={classNames('aside-wrapper', { hide: !isHide })}>
                    <NavLink data-test-id={burgerWigth ? 'navigation-books' : 'burger-books'} to='/books/all'>
                        Все книги
                    </NavLink>
                    {categories === null
                        ? ''
                        : categories.map((category) => (
                              <div key={category.id}>
                                  <NavLink
                                      data-test-id={burgerWigth ? `navigation-${category}` : `burger-${category}`}
                                      to={`/books/${category.path}`}
                                  >
                                      {category.name}
                                      {valueBooksInCategory[category.name] ? (
                                          <span data-test-id={`navigation-book-count-for-${category}`}>
                                              {valueBooksInCategory[category.name]}
                                          </span>
                                      ) : (
                                          <span data-test-id={`navigation-book-count-for-${category}`}>0</span>
                                      )}
                                  </NavLink>
                              </div>
                          ))}
                </div>
            </h5>
            <h5>
                <NavLink data-test-id={burgerWigth ? 'navigation-terms' : 'burger-terms'} to='/rules'>
                    Правила пользования
                </NavLink>
            </h5>
            <h5>
                <NavLink data-test-id={burgerWigth ? 'navigation-contract' : 'burger-contract'} to='/terms'>
                    Договор оферты
                </NavLink>
            </h5>
            <div className='aside__user'>
                <div className='aside__seporator' />
                <h5>
                    <NavLink to='/profile'>Профиль</NavLink>
                </h5>
                <h5>
                    <NavLink to='/exit'>Выход</NavLink>
                </h5>
            </div>
        </aside>
    );
};
