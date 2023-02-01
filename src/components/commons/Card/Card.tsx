import React from 'react';
import classes from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Card = (props: Props) => {
  return <div className={`${classes.card} ${props.className != null ? props.className : ''}`}>{props.children}</div>;
};

export default Card;
