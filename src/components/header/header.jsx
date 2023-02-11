import { Link } from 'react-router-dom';
import classNames from 'classnames';

import avatar from '../../assets/images/avatar.svg';
import cleverland from '../../assets/images/cleverland.svg';
import logo from '../../assets/images/logo-clevertec_40.svg';

import './header.css';

export const Header = ({ isShow, setIsShow }) => {
  const showMenu = (e) => {
    e.stopPropagation();
    setIsShow(!isShow);
    e.preventDefault();
  };

  return (
    <header>
      <div className='header__logo'>
        <Link to='/'>
          <img src={logo} alt='logo' />
          <img src={cleverland} alt='cleverland' />
        </Link>
      </div>
      <button data-test-id='button-burger' type='button' aria-label='header__btn-menu' onClick={showMenu}>
        <div type='button' className={classNames('header__btn-menu', { cross: isShow })}>
          <div />
          <div />
          <div />
        </div>
      </button>
      <p>Библиотека</p>
      <div className='header__user'>
        <p>Привет, Иван!</p>
        <img src={avatar} alt='avatar' />
      </div>
    </header>
  );
};
