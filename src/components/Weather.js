/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

//import { API_KEY } from 'api/api';

// const dotenv = require('dotenv');
// dotenv.config({ path: '.env' });

const API_KEY = process.env.REACT_APP_API_KEY;

import {
  WeatherWrapper,
  Temp,
  City,
  WeatherType,
  WeatherIcon,
  CityWrapper,
  WeatherKind,
} from './Styling/weather_styles';

const Weather = () => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState('');
  const [icon, setIcon] = useState('');

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      console.log(res.data);
      setTemperature(res.data.current.temp);
      setWeather(res.data.current.weather[0].main);
      setIcon(res.data.current.weather[0].icon);
      console.log(icon);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCityName = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=10&appid=${API_KEY}`
      );
      console.log(res.data);
      setCityName(res.data[0].name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchCityName();
  }, [latitude, longitude]);
  return (
    <>
      <WeatherWrapper>
        <Temp>{Math.round(temperature)}°</Temp>
        <CityWrapper>
          <City>{cityName}</City>

          <WeatherKind>{weather}</WeatherKind>

          {/*<img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt='Logo'
  />*/}
        </CityWrapper>
      </WeatherWrapper>
      {weather === 'Clear' && (
        <WeatherType>Looks like your plants will enjoy it today! </WeatherType>
      )}
      {weather === 'Rain' && (
        <WeatherType>No need to water your plants outside today! </WeatherType>
      )}
      {weather === 'Clouds' && (
        <WeatherType>
          A good day for taking care of your plants or just to rest a bit..
        </WeatherType>
      )}
    </>
  );
};

export default Weather;
