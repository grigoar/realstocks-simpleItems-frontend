import React from 'react';

import classes from './LoadingSpinner.module.scss';

type Props = {
  text?: string;
};

const LoadingSpinner = (props: Props) => {
  return (
    <div
      className={`centerItem ${classes.loadingContainer}`}
      style={{ height: '100%', zIndex: '100' }}
    >
      <div className={classes.loading}></div>
      {props.text != null && props.text !== '' && <div>{props.text}</div>}
    </div>
  );
};

export default LoadingSpinner;
