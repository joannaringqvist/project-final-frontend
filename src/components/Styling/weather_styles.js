/* eslint-disable */
import styled from 'styled-components';

export const WeatherWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 668px) {
  }
`;

export const Temp = styled.h1`
  font-size: 45px;
  padding-right: 10px;
  @media (min-width: 668px) {
    margin-top: 0;
  }
`;

export const City = styled.p`
  font-style: italic;
  margin: 3px;
`;

export const WeatherType = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 0px 20px 0px 20px;
`;

export const WeatherIcon = styled.img``;

export const WeatherKind = styled.p`
  font-size: 22px;
  margin: 3px;
`;

export const CityWrapper = styled.div``;
