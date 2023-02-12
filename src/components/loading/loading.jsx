import Lottie from 'lottie-react';

import loading from './loading.json';

import './loading.css';

export const Loading = () => (
  <div className='loading'>
    <Lottie animationData={loading} loop={true} />
  </div>
);
