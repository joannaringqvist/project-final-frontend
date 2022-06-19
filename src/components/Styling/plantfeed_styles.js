/* eslint-disable */
import styled from 'styled-components';

export const PlantFeedWrapper = styled.div`
  border-bottom: 2px solid #c1ac95;
  @media (min-width: 668px) {
  }
`;

export const PlantWrapper = styled.div`
  background-color: white;
  width: 600px;
  border-radius: 20px;
  margin: 10px;
  padding: 5px;
  position: relative;
  box-shadow: 2px 10px 10px 3px grey;
`;

export const AddWrapper = styled.div``;

export const PlantCardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const DeleteButton = styled.button`
  height: 32px;
  width: 32px;
  background-color: rgb(250, 235, 224);
  border-radius: 20px;
  border: 0px;
`;

export const DeleteIcon = styled.img`
  bottom: 5px;
  top: 8px;
  right: 7px;
  left: 8px;
  height: 17px;
  width: 17px;
`;

export const PlantName = styled.p`
  color: black;
  font-size: 20px;
  font-family: 'Lora', serif;
`;

export const PlantAdd = styled.p`
  font-style: italic;
`;

export const PlantBtnText = styled.p``;

export const PlantsLengthWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PlantsLength = styled.p`
  font-size: 18px;
  text-align: center;
`;

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c1ac95;
  height: 120px;
  @media (min-width: 668px) {
    height: 150px;
  }
`;

export const StyledBtn = styled.button`
  border-radius: 20px;
  height: 40px;
  width: fit-content;
  font-weight: bold;
  margin: 25px;
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

export const StyledDeleteBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 20px;
  height: 40px;
  width: fit-content;
  font-weight: bold;
  margin: 20px;
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(250, 235, 224);
  border: none;
  transition: transform 0.7s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const StyledBtnAdd = styled.button`
  border-radius: 50px;
  height: 60px;
  width: 60px;

  margin: 20px 20px 0px 0px;
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(250, 235, 224);
  border: none;
  transition: transform 0.7s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  @media (min-width: 668px) {
    height: 80px;
    width: 80px;
  }
`;

export const AddImg = styled.img`
  height: 50px;
  @media (min-width: 668px) {
    height: 60px;
  }
`;

export const ArrowImg = styled.img`
  height: 100px;
`;

export const FavouriteStar = styled.img`
  height: 25px;
`;

export const ButtonCheckbox = styled.input.attrs({ type: 'checkbox' })`
  height: 32px;
  width: 40px;
  cursor: pointer;
  position: absolute;
  opacity: 0;
`;

export const CheckboxContainer = styled.span`
  display: flex;
  width: 50%;
  height: 32px;
  border-radius: 32px;
  background-color: rgb(250, 235, 224);
  position: absolute;
  z-index: -1;

  ${ButtonCheckbox}:checked + && {
    background-color: #d57e7e;
  }
`;

export const CheckBoxLabel = styled.label`
  min-width: 70px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  color: var(--grey-600);
  transition: 0.2s;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  padding: 0 1rem;
  z-index: 2;
`;
