/* eslint-disable */
import styled from 'styled-components';

export const PlantfeedCard = styled.div`
  border-top: 2px solid #c1ac95;
  margin: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const PlantfeedCardTwo = styled.div`
  border-top: 2px solid #c1ac95;
  margin: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 1200px) {
    flex-direction: row-reverse;
    justify-content: center;
  }
`;

export const PlantfeedCardText = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 0px;
  @media (min-width: 1200px) {
    width: 300px;
    margin-top: 220px;
    font-size: 20px;
  }
`;

export const PlantLady = styled.img`
  width: 300px;
  margin: 0;
  @media (min-width: 1200px) {
    width: 500px;
  }
`;

export const PlantfeedCardTextBold = styled.span`
  font-weight: bold;
  font-size: 20px;
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;

export const ProfileWrapper = styled.section`
  position: relative;
`;

export const PlantfeedBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
