import React from 'react';
import classes from './App.module.scss';
import AddItemPage from './pages/AddItemPage';

const App = () => {
  return (
    <div className={classes.mainContainer}>
      <header>
        <h1>Simple Items</h1>
      </header>
      <main className={classes.main}>
        <AddItemPage />
      </main>
    </div>
  );
};

export default App;
