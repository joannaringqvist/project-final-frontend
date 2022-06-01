/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';

const Loading = () => {
  const isLoading = useSelector((store) => store.ui.isLoading);

  return (
    isLoading && (
      <div>
        <p>Loading..</p>
      </div>
    )
  );
};

export default Loading;
