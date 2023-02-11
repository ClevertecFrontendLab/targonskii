import { useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import unknownBookImage from '../../assets/images/unknown-book-image.svg';
import { Aside } from '../../components/aside/aside';
import { Review } from '../../components/review/review';
import { Slider } from '../../components/slider/slider';
import { booksList1 } from '../../constants/booksList.js';

import './book-page.css';

import 'swiper/css';
import 'swiper/css/pagination';

export const BookPage = () => {
  const { id } = useParams();
  const numId = Number(id);

  const [isHide, setIsHide] = useState(true);

  return (
    <main>
      <Aside />
      {booksList1.map((book) =>
        book.id === numId ? (
          <div className='book-page' key={book.id}>
            <div className='book-page__path'>
              <span>Бизнес книги</span>
              <span>Грокаем алгоритмы.</span>
            </div>
            <div className='book-page__wrapper'>
              <div className='book-page__book'>
                <div className='book-page__img-book'>
                  {book.image.length === 0 ? (
                    <img src={unknownBookImage} alt='unknownBookImage' />
                  ) : book.image.length === 1 ? (
                    <img src={book.image[0].img} alt='bookImage' />
                  ) : (
                    <Slider imageArr={book.image} />
                  )}
                </div>
                <div className='book-page__about-book'>
                  <p>{book.bookName}</p>
                  <p>
                    {book.author}, {book.year}
                  </p>
                  <button type='button'>
                    {book.availability ? <span>ЗАБРОНИРОВАТЬ</span> : <span>ЗАНЯТА ДО {book.date}</span>}
                  </button>
                  <div className='book-page__about'>
                    <p>О книге</p>
                    <p>{book.description}</p>
                  </div>
                </div>
              </div>
              <div className='book-page__about--mobile'>
                <p>О книге</p>
                <p>{book.description}</p>
              </div>
              <div className='book-page__information'>
                <div className='book-page__rating'>
                  <p>Рейтинг</p>
                  <div className='book-page__seporator' />
                  <p>{book.evaluation}</p>
                </div>
                <div className='book-page__description'>
                  <p>Подробная информация</p>
                  <div className='book-page__seporator' />
                  <div className='book-page__description-wrapper'>
                    <div className='book-page__descripton-first'>
                      <p>
                        Издательство <span>{book.publishingHouse}</span>
                      </p>
                      <p>
                        Год издания <span>{book.year}</span>
                      </p>
                      <p>
                        Страниц <span>{book.pages}</span>
                      </p>
                      <p>
                        Переплёт <span>{book.binding}</span>
                      </p>
                      <p>
                        Формат <span>{book.size}</span>
                      </p>
                    </div>
                    <div className='book-page__descripton-second'>
                      <p>
                        Жанр <span>Компьютерная литература</span>
                      </p>
                      <p>
                        Вес <span>{book.weight} г.</span>
                      </p>
                      <p>
                        ISBN <span>{book.isbn}</span>
                      </p>
                      <p>
                        Изготовитель <span>{book.manufacturer}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='book-page__review'>
                  <div className='book-page__review-header'>
                    <p>
                      Отзывы <span>{book.review.length}</span>
                    </p>
                    <button
                      data-test-id='button-hide-reviews'
                      className={classNames('book-page__review-button', { hide: isHide })}
                      type='button'
                      aria-label='book-page__review-button'
                      onClick={() => setIsHide(!isHide)}
                    />
                  </div>
                  <div className={classNames('book-page__review-card', { hide: isHide })}>
                    <div className='book-page__seporator' />
                    {book.review.map((review) => (
                      <Review review={review} key={review.id} />
                    ))}
                  </div>
                  <button data-test-id='button-rating' type='button'>
                    Оценить книгу
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key={book.id} />
        )
      )}
    </main>
  );
};
