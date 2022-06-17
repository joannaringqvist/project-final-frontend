/* eslint-disable */
import styled from 'styled-components';

export const Formwrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 500px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  margin: 20px;
`;

export const InputWrapper = styled.div`
  margin: 5px 0px 15px 0px;
`;

export const Label = styled.label`
  font-family: 'Montserrat', sans-serif;
`;

export const PlantPic = styled.img`
  margin: 15px;
  height: 50px;
  width: 50px;
`;

export const LoginText = styled.p`
  font-size: 18px;
  font-style: italic;
`;

export const LogoText = styled.h1`
  font-size: 25px;
  margin-top: 30px;
`;

export const LoginButton = styled.button`
  border-radius: 20px;
  height: 40px;
  font-weight: bold;
  width: fit-content;
  margin: 5px;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(250, 235, 224);
  border: none;
  transition: transform 0.6s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
