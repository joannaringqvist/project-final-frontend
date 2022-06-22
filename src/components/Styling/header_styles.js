/* eslint-disable */
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #c1ac95;
  background-color: #c9e4c5;
  @media (min-width: 668px) {
    height: 150px;
  }
`;

export const WelcomeUser = styled.h1`
  margin: 15px 0px 0px 15px;
  font-size: 20px;
  @media (min-width: 668px) {
    font-size: 30px;
    margin: 15px 0px 0px 15px;
  }
`;

export const DateText = styled.p`
  margin: 15px;
  font-size: 14px;
  @media (min-width: 668px) {
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
  @media (min-width: 668px) {
    width: 200px;
    font-size: 20px;
  }
`;
export const Logo = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (min-width: 668px) {
    width: 200px;
  }
`;

export const LogoTwo = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (min-width: 668px) {
  }
`;

export const LogoThree = styled.div`
  @media (min-width: 668px) {
    margin-bottom: 20px;
  }
`;

export const LogoText = styled.h1`
  font-size: 15px;
  letter-spacing: 2px;

  @media (min-width: 668px) {
    letter-spacing: 4px;
    font-size: 30px;
  }
`;

export const LogoTextTwo = styled.h1`
  font-size: 16px;
  letter-spacing: 2px;
  @media (min-width: 668px) {
    font-size: 25px;
  }
`;

export const LogoImg = styled.img`
  width: 50px;
  margin-bottom: -50px;

  @media (min-width: 668px) {
    width: 100px;
    margin-bottom: -100px;
  }
`;

export const DateWrapper = styled.div`
  @media (min-width: 668px) {
    width: 250px;
    text-align: right;
  }
`;

export const BtnWrapper = styled.div`
  @media (min-width: 668px) {
    align-self: center;
  }
`;
