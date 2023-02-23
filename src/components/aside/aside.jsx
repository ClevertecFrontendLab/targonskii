import { useEffect, useState } from 'react';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import classNames from 'classnames';

import './aside.css';

export const Aside = ({ categories, listCategory, onClick }) => {
    const [isHide, setIsHide] = useState(true);
    const [ref, isShow] = useOutletContext();
    const burgerWigth = window.innerWidth > 768;
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/rules' || location.pathname === '/terms') {
            setIsHide(false);
        } else {
            setIsHide(true);
        }
    }, [location.pathname]);

    const setCategory = ({ category }) => {
        onClick(category);
        console.log(category);
    };

    return (
        <aside data-test-id='burger-navigation' ref={ref} className={classNames('aside', { hide: !isShow })}>
            <h5>
                <NavLink
                    data-test-id={burgerWigth ? 'navigation-showcase' : 'burger-showcase'}
                    to='/'
                    className={classNames('aside__button', { hide: !isHide })}
                    onClick={() => setIsHide(!isHide)}
                >
                    Витрина книг
                </NavLink>
            </h5>
            <div className={classNames('aside-wrapper', { hide: !isHide })}>
                <NavLink data-test-id={burgerWigth ? 'navigation-books' : 'burger-books'} to='/books/all'>
                    Все книги
                </NavLink>
                {categories === null
                    ? ''
                    : categories.map((category) => (
                          <div key={category.id}>
                              <NavLink to={`/books/${category.path}`} onClick={setCategory}>
                                  {category.name}
                                  {listCategory[category.name] ? (
                                      <span>{listCategory[category.name]}</span>
                                  ) : (
                                      <span>0</span>
                                  )}
                              </NavLink>
                          </div>
                      ))}
            </div>
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
