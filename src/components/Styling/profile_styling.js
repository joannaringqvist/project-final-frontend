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
  }
`;

export const PlantfeedCardText = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 0px;
`;

export const PlantLady = styled.img`
  width: 300px;
  margin: 0;
`;

export const PlantfeedCardTextBold = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

export const ProfileWrapper = styled.section`
  position: relative;
`;

export const PlantfeedBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
