import React, { useState } from 'react';
import classes from './AddItem.module.scss';
import Card from '../commons/Card/Card';
import validateFields from '../../utils/validate';
import { fetchCreateItem } from '../../utils/helpers';
import constants from '../../utils/constants';
import useDisplayResultMessage from '../../hooks/useDisplayResultMessage';
import MessageResult from '../commons/MessageResult/MessageResult';

const AddItem = () => {
  const [simpleItemContent, setSimpleItemContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    showResultErrorMessage,
    showResultSuccessMessage,
    isMessageError,
    resultMessageDisplay,
  } = useDisplayResultMessage(constants.DEFAULT_TIME_DISPLAY_MESSAGE_S);

  const addNewItemHandler = async (newItem: string) => {
    try {
      setIsSubmitting(true);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newItem }),
      };

      const response = await fetchCreateItem(
        constants.CREATE_ITEM_API_URL,
        requestOptions
      );

      setIsSubmitting(false);

      if (
        response.statusCode?.toString().startsWith('4') ||
        response.statusCode?.toString().startsWith('5')
      ) {
        const errMessage = JSON.parse(response.body || '');
        showResultErrorMessage(errMessage.message.split('*').join(' || '));
        return;
      }
      showResultSuccessMessage('Item added!');
    } catch (err) {
      setIsSubmitting(false);
      showResultErrorMessage('Something went wrong! Please try again');
    }
  };

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const message = validateFields({ simpleString: simpleItemContent.trim() });

    if (message) {
      showResultErrorMessage(message.split('*').join(' || '));
      return;
    }

    addNewItemHandler(simpleItemContent.trim());
  };

  const changeItemStringHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSimpleItemContent(e.target.value);
  };
  return (
    <div className={classes.addItemContainer}>
      <Card className={classes.cardContainer}>
        <form
          onSubmit={onSubmitHandler}
          className={classes.formContainer}
          autoComplete='off'
        >
          <label htmlFor={'itemString'}>Item Name</label>
          <input
            type='text'
            name='feedbackContent'
            placeholder='simple string'
            id='itemString'
            className={classes.input}
            value={simpleItemContent}
            onChange={changeItemStringHandler}
          />
          <div className={classes.submitBtnContainer}>
            <button type='submit' className={classes.submitBtn}>
              Add Item
            </button>
          </div>
        </form>
        <MessageResult
          isLoadingAction={isSubmitting}
          isError={isMessageError}
          message={resultMessageDisplay}
        />
      </Card>
    </div>
  );
};

export default AddItem;
