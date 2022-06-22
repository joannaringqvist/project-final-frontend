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
  height: 120px;
  display: flex;
  align-items: center;
  @media (min-width: 668px) {
    height: 150px;
    justify-self: flex-start;
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

export const CalendarImg = styled.img`
  height: 200px;
`;

export const DeleteWrapper = styled.div`
  text-align: center;
  margin-top: 0px;
`;

export const DatePickerWrap = styled.div`
  margin-left: 0px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #c1ac95;

  @media (min-width: 668px) {
    justify-content: space-between;
  }
`;

export const InvisibleDiv = styled.div`
  @media (min-width: 668px) {
    width: 250px;
  }
`;
