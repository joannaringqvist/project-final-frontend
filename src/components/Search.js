/* eslint-disable */
import React from 'react';

const Search = () => {
  return (
    <form action='/' method='get'>
      <label htmlFor='header-search'>
        <span className='visually-hidden'>Search plants</span>
      </label>
      <input
        type='text'
        id='header-search'
        placeholder='Search plants'
        name='s'
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default Search;
