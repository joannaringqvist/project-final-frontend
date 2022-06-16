/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  @media (min-width: 768px) {
    width: 768px;
    margin: 0 auto;
    border: 1px solid yellow;
  }

  @media (min-width: 1025px) {
    width: 1025px;
    margin: 0 auto;
    border: 1px solid purple;
  }

  @media (min-width: 1400px) {
    width: 1400px;
    margin: 0 auto;
    border: 1px solid orange;
  }
`;