/* eslint-disable */
import React from 'react';
import styled from 'styled-components';

export const EventInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px;
`;

export const AddEventBtn = styled.button`
  width: 150px;
  margin-top: 10px;
`;

export const AddEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  border-bottom: 2px solid #c1ac95;
`;

export const ButtonWrapper = styled.div`
  border-bottom: 2px solid #c1ac95;
  height: 120px;
  display: flex;
  align-items: center;
  @media (min-width: 1200px) {
    height: 150px;
  }
`;

export const TitleText = styled.input`
  margin: 10px;
  border-radius: 10px;
  border: 1px solid black;
  font-family: 'Montserrat', sans-serif;
`;

export const DateText = styled.p`
  margin: 0px;
`;
export const CalendarEdit = styled.div`
  background-color: red;
  height: 100vh;
  position: absolute;
  z-index: 2;
`;

export const CalendarImg = styled.img`
  height: 200px;
`;

export const DeleteWrapper = styled.div`
  text-align: center;
  margin-top: 0px;
`;
