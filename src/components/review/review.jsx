import './review.css';

export const Review = ({ review }) => (
  <div className='review'>
    <div className='review__user'>
      <img src={review.avatar} alt='avatar-review' />
      <p>{review.user}</p>
      <p>{review.date}</p>
    </div>
    <div className='review__user-mobile'>
      <img src={review.avatar} alt='avatar-review' />
      <div className='review__user-mobile-wrapper'>
        <p>{review.user}</p>
        <p className='review__user-mobile-date'>{review.date}</p>
      </div>
    </div>
    <p>{review.text ? review.text : ''}</p>
  </div>
);
