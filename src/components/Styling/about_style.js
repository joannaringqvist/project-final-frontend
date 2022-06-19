/* eslint-disable */
import styled from 'styled-components';

export const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 668px) {
    flex-direction: row;
    width: 800px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;

export const AboutWrapperTwo = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 668px) {
    flex-direction: row-reverse;
    width: 800px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;

export const AboutTextWrapper = styled.div``;

export const AboutImg = styled.img`
  width: 400px;
  margin: 0px;
`;

export const AboutHead = styled.h1`
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #c1ac95;
  height: 120px;
  @media (min-width: 668px) {
    height: 150px;
  }
`;

export const AboutText = styled.p`
  margin: 20px;
  @media (min-width: 668px) {
    font-size: 20px;
  }
`;

export const AboutHeadLine = styled.h2`
  margin: 20px;
  font-size: 20px;
  @media (min-width: 668px) {
    font-size: 22px;
  }
`;
