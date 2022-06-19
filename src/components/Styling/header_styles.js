/* eslint-disable */
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 120px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c1ac95;
  background-color: #c9e4c5;
  @media (min-width: 1200px) {
    height: 150px;
  }
`;

export const WelcomeUser = styled.h1`
  margin: 15px 0px 0px 15px;
  @media (min-width: 1200px) {
  }
`;

export const DateText = styled.p`
  margin: 15px;
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

export const HeaderBtn = styled.button`
  border-radius: 20px;
  height: 40px;
  width: fit-content;
  font-weight: bold;
  margin: 10px 0px 0px 15px;
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(250, 235, 224);
  border: none;
  transition: transform 0.7s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  @media (min-width: 1200px) {
    width: 200px;
    font-size: 20px;
  }
`;
