import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import s from './Loader.module.css';

function Loader() {
  const props = {
    color: 'blue',
    height: 20,
    width: 5,
    radius: 1,
    margin: 15,
    speedMultiplier: 3,
  };
  return (
    <div className={s.Loader}>
      <FadeLoader {...props} />
    </div>
  );
}

export default Loader;
