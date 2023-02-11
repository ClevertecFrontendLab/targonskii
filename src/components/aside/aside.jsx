import { useEffect, useState } from 'react';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import classNames from 'classnames';

import './aside.css';

export const Aside = () => {
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
        <NavLink data-test-id={burgerWigth ? 'navigation-books' : 'burger-books'} to='/books/allbooks'>
          Все книги
        </NavLink>
        <div>
          <NavLink to='/books/business'>
            Бизнес-книги<span>14</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/detective'>
            Детективы <span>8</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/children'>
            Детские книги<span>14</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/foreign'>
            Зарубежная литература <span>2</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/history'>
            История <span>5</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/classic'>
            Классическая литература <span>12</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/psychology'>
            Книги по психологии <span>11</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/computer'>
            Компьютерная литература <span>54</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/culture'>
            Культура и искусство <span>5</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/science'>
            Наука и образование <span>2</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/journalism'>
            Публицистическая <br /> литература <span>0</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/directory'>
            Справочники <span>10</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/fantastic'>
            Фантастика <span>12</span>
          </NavLink>
        </div>
        <div>
          <NavLink to='/books/humor'>
            Юмористическая <br /> литература <span>8</span>
          </NavLink>
        </div>
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
