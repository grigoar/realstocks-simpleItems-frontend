import React, { useState } from 'react';
import classes from './AddItem.module.scss';
import Card from '../commons/Card/Card';
import validateFields from '../../utils/validate';
import { fetchCreateItem } from '../../utils/helpers';
import constants from '../../utils/constants';

const AddItem = () => {
  const [simpleItemContent, setSimpleItemContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const addNewItemHandler = async (newItem: string) => {
    try {
      setIsSubmitting(true);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          // 'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ content: newItem }),
      };

      const response = await fetchCreateItem(
        constants.CREATE_ITEM_API_URL,
        requestOptions
      );
      console.log('response ---------------');
      console.log(response);

      setIsSubmitting(false);

      if (
        response.statusCode?.toString().startsWith('4') ||
        response.statusCode?.toString().startsWith('5')
      ) {
        const errMessage = JSON.parse(response.body || '');
        const errMessageJson = JSON.parse(errMessage);
        console.log(errMessageJson);
        return;
      }
      console.log('Item added');
    } catch (err) {
      setIsSubmitting(false);
      console.log('Something went wrong with the call');
    }
  };

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const message = validateFields({ simpleString: simpleItemContent });

    if (message) {
      console.log('Error Messages', message);
      return;
    }

    addNewItemHandler(simpleItemContent);
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
          <label className={classes.label} htmlFor={'itemString'}>
            Item Name
          </label>
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
      </Card>
    </div>
  );
};

export default AddItem;
