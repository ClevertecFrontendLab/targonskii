import unknownBookImageSmall from '../../assets/images/unknown-book-image-small.svg';

import './book-card-list.css';

export const BookCardList = ({ book }) => (
  <div className='book-card-list'>
    <div className='book-card-list__image'>
      <img src={book.image.length === 0 ? unknownBookImageSmall : book.image[0].img} alt='book-img' />
    </div>
    <div className='book-card-list__description'>
      <p>{book.bookName}</p>
      <p>
        {book.author}, {book.year}
      </p>
      <div className='book-card-list__wrapper'>
        {book.evaluation ? (
          <div className='book-card-list__evaluation' />
        ) : (
          <div className='book-card-list__evaluation-empty'>
            <p>еще нет оценок</p>
          </div>
        )}
        {book.availability === 'available' ? (
          <button type='button' className='book-card-list__button--active'>
            ЗАБРОНИРОВАТЬ
          </button>
        ) : book.availability === 'busy' ? (
          <button type='button' className='book-card-list__button--busy'>
            ЗАНЯТА ДО {book.date}
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
