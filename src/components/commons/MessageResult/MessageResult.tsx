import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import classes from './MessageResult.module.scss';

interface Props {
  message: string;
  isError: boolean;
  isLoadingAction: boolean;
  loadingMessage?: string;
}
const MessageResult = ({
  message,
  isError,
  isLoadingAction,
  loadingMessage,
}: Props) => {
  if (isLoadingAction) {
    return (
      <div
        className={`${classes.displayMessageLoadingSpinner} ${
          isError ? classes.error : classes.success
        }`}
      >
        <LoadingSpinner />
        {loadingMessage && (
          <div>
            <p className={classes.success}>{loadingMessage}</p>
          </div>
        )}
      </div>
    );
  }
  if (!message) {
    return null;
  }
  return (
    <div
      className={`${classes.displayMessageContainer} ${
        isError ? classes.error : classes.success
      }`}
    >
      {!isLoadingAction && <p>{message}</p>}
    </div>
  );
};

export default MessageResult;
