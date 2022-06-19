/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

export const SingleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 668px) {
    flex-direction: row-reverse;
    justify-content: center;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

export const SingleTextContainer = styled.div`
  margin: 20px;
  @media (min-width: 668px) {
    display: flex;
    flex-direction: column;

    justify-content: center;
  }
`;

export const SingleTextDiv = styled.div`
  margin-bottom: 10px;
`;

export const PlantText = styled.span`
  font-weight: bold;
`;

export const PlantNameText = styled.span`
  font-size: 18px;
`;

export const SingleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
