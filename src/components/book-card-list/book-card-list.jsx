import unknownBookImageSmall from '../../assets/images/unknown-book-image-small.svg';
import { hostUrl } from '../../constants/urls';

import './book-card-list.css';

export const BookCardList = ({ book }) => (
  <div className='book-card-list'>
    <div className='book-card-list__image'>
      <img src={book.image === null ? unknownBookImageSmall : hostUrl + book.image.url} alt='book-img' />
    </div>
    <div className='book-card-list__description'>
      <p>{book.title.slice(0, 30)}...</p>
      <p>
        {book.authors}, {book.issueYear}
      </p>
      <div className='book-card-list__wrapper'>
        {book.rating ? (
          <div className='book-card-list__evaluation' />
        ) : (
          <div className='book-card-list__evaluation-empty'>
            <p>еще нет оценок</p>
          </div>
        )}
        {book.booking === null ? (
          <button type='button' className='book-card-list__button--active'>
            ЗАБРОНИРОВАТЬ
          </button>
        ) : book.booking.order === true ? (
          <button type='button' className='book-card-list__button--busy'>
            ЗАНЯТА ДО {new Date(book.booking.dateOrder).toLocaleDateString().slice(0, 5)}
          </button>
        ) : (
          <button type='button' className='book-card-list__button--booked'>
            ЗАБРОНИРОВАНА
          </button>
        )}
      </div>
    </div>
  </div>
);
