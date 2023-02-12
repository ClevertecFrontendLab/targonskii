import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import unknownBookImage from '../../assets/images/unknown-book-image.svg';
import { Aside } from '../../components/aside/aside';
import { Loading } from '../../components/loading/loading.jsx';
import { Review } from '../../components/review/review';
import { Slider } from '../../components/slider/slider';
import { fetchBook } from '../../redux/book/book-slice';

// import { books } from '../../constants/booksList.js';
import './book-page.css';

import 'swiper/css';
import 'swiper/css/pagination';

export const BookPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isHide, setIsHide] = useState(true);
  const isLoadingStatus = useSelector((state) => state.book.status);
  const bookCard = useSelector((state) => state.book.book);

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  return (
    <main>
      <Aside />
      {isLoadingStatus === 'loading' || null ? (
        <Loading />
      ) : (
        <div className='book-page' key={bookCard.id}>
          <div className='book-page__path'>
            <span>Бизнес книги</span>
            <span>Грокаем алгоритмы.</span>
          </div>
          <div className='book-page__wrapper'>
            <div className='book-page__book'>
              <div className='book-page__img-book'>
                {bookCard.image.length === 0 ? (
                  <img src={unknownBookImage} alt='unknownBookImage' />
                ) : bookCard.image.length === 1 ? (
                  <img src={bookCard.image[0].img} alt='bookImage' />
                ) : (
                  <Slider imageArr={bookCard.image} />
                )}
              </div>
              <div className='book-page__about-book'>
                <p>{bookCard.bookName}</p>
                <p>
                  {bookCard.author}, {bookCard.year}
                </p>
                <button type='button'>
                  {bookCard.availability ? <span>ЗАБРОНИРОВАТЬ</span> : <span>ЗАНЯТА ДО {bookCard.date}</span>}
                </button>
                <div className='book-page__about'>
                  <p>О книге</p>
                  <p>{bookCard.description}</p>
                </div>
              </div>
            </div>
            <div className='book-page__about--mobile'>
              <p>О книге</p>
              <p>{bookCard.description}</p>
            </div>
            <div className='book-page__information'>
              <div className='book-page__rating'>
                <p>Рейтинг</p>
                <div className='book-page__seporator' />
                <p>{bookCard.evaluation}</p>
              </div>
              <div className='book-page__description'>
                <p>Подробная информация</p>
                <div className='book-page__seporator' />
                <div className='book-page__description-wrapper'>
                  <div className='book-page__descripton-first'>
                    <p>
                      Издательство <span>{bookCard.publishingHouse}</span>
                    </p>
                    <p>
                      Год издания <span>{bookCard.year}</span>
                    </p>
                    <p>
                      Страниц <span>{bookCard.pages}</span>
                    </p>
                    <p>
                      Переплёт <span>{bookCard.binding}</span>
                    </p>
                    <p>
                      Формат <span>{bookCard.size}</span>
                    </p>
                  </div>
                  <div className='book-page__descripton-second'>
                    <p>
                      Жанр <span>Компьютерная литература</span>
                    </p>
                    <p>
                      Вес <span>{bookCard.weight} г.</span>
                    </p>
                    <p>
                      ISBN <span>{bookCard.isbn}</span>
                    </p>
                    <p>
                      Изготовитель <span>{bookCard.manufacturer}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='book-page__review'>
                <div className='book-page__review-header'>
                  <p>
                    Отзывы <span>{bookCard.review.length}</span>
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
                  {bookCard.review.map((review) => (
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
      )}
    </main>
  );
};
