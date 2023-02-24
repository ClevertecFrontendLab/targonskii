import unknownBookImageSmall from '../../assets/images/unknown-book-image-small.svg';
import { hostUrl } from '../../constants/urls';
import { BookTitle } from '../book-title/book-title';

import './book-card-square.css';

export const BookCardSquare = ({ book, searchStr }) => (
    <div className='book-card-square'>
        <img src={book.image === null ? unknownBookImageSmall : hostUrl + book.image.url} alt='book-img' />
        {book.rating ? (
            <div className='book-card-square__evaluation' />
        ) : (
            <div className='book-card-square__evaluation-empty'>
                <p>еще нет оценок</p>
            </div>
        )}
        <p>{book.title.slice(0, 30)}...</p>
        {/* <BookTitle searchStr={searchStr} book={book} /> */}
        <p>
            {book.authors}, {book.issueYear}
        </p>
        {book.booking === null ? (
            <button type='button' className='book-card-square__button--active'>
                ЗАБРОНИРОВАТЬ
            </button>
        ) : book.booking.order === true ? (
            <button type='button' className='book-card-square__button--busy'>
                ЗАНЯТА ДО {new Date(book.booking.dateOrder).toLocaleDateString().slice(0, 5)}
            </button>
        ) : (
            <button type='button' className='book-card-square__button--booked'>
                ЗАБРОНИРОВАНА
            </button>
        )}
    </div>
);
