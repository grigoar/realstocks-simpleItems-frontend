import React from 'react';
import classes from './App.module.scss';

const App = () => {
  return (
    <div className={classes.mainContainer}>
      <header>
        <h1>Add Items</h1>
      </header>
      <main className={classes.main}>
        <h2>Add New Item</h2>
      </main>
    </div>
  );
};

export default App;
