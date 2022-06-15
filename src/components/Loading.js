/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

import { Animation } from './Animation';

const Loading = () => {
  const isLoading = useSelector((store) => store.ui.isLoading);

  return (
    isLoading && (
      <div>
        <Animation />
      </div>
    )
  );
};

export default Loading;
