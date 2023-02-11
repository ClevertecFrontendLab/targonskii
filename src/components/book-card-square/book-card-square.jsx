import unknownBookImageSmall from '../../assets/images/unknown-book-image-small.svg';

import './book-card-square.css';

export const BookCardSquare = ({ book }) => (
  <div className='book-card-square'>
    <img src={book.image.length === 0 ? unknownBookImageSmall : book.image[0].img} alt='book-img' />
    {book.evaluation ? (
      <div className='book-card-square__evaluation' />
    ) : (
      <div className='book-card-square__evaluation-empty'>
        <p>еще нет оценок</p>
      </div>
    )}
    <p>{book.bookName}</p>
    <p>
      {book.author}, {book.year}
    </p>
    {book.availability === 'available' ? (
      <button type='button' className='book-card-square__button--active'>
        ЗАБРОНИРОВАТЬ
      </button>
    ) : book.availability === 'busy' ? (
      <button type='button' className='book-card-square__button--busy'>
        ЗАНЯТА ДО {book.date}
      </button>
    ) : (
      <button type='button' className='book-card-square__button--booked'>
        ЗАБРОНИРОВАНА
      </button>
    )}
  </div>
);
