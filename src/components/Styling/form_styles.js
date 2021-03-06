/* eslint-disable */
import styled from 'styled-components';

export const Formwrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 600px;
`;

export const StyledBtn = styled.button`
  border-radius: 20px;
  height: 40px;
  width: fit-content;
  font-weight: bold;

  font-family: 'Montserrat', sans-serif;
  background-color: rgb(250, 235, 224);
  border: none;
  align-self: center;
  transition: transform 0.6s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  @media (min-width: 668px) {
    width: 200px;
    font-size: 20px;
  }
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

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NameInput = styled.input`
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid black;
`;

export const TextInput = styled.textarea`
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  height: 50px;
`;

export const Dropdown = styled.select.attrs({ type: 'dropdown' })`
  border-radius: 20px;
  height: 30px;
  font-family: 'Montserrat', sans-serif;
`;

export const ErrorMessage = styled.p`
  background-color: rgb(250, 235, 224);
  border-radius: 10px;
  padding: 5px;
  @media (min-width: 668px) {
    font-size: 22px;
  }
`;

export const EditAddPlantImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
`;

export const InputWrapperImage = styled.div`
  margin: 0 0 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  width: 500px;
  background-color: #fff;
  border-radius: 20px;
  line-height: 1.7;
  font-size: 18px;
`;

export const ModalBody = styled.div`
  padding: 10px;
`;

export const ModalTitle = styled.h1``;

export const ModalImg = styled.img`
  width: 50px;
`;

export const ModalButton = styled.button`
  border-radius: 20px;
  height: 40px;
  font-weight: bold;
  width: fit-content;
  margin: 35px 5px 5px 5px;
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
