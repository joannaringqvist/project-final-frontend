/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { WeatherWrapper } from './Styling/weather_styles';

const Weather = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState('');
  const [icon, setIcon] = useState('');
  const date = moment().format('MMMM Do');
  const weekday = moment().format('dddd');

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
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=e3359107dd6692984f64be928b7d64ae`
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
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=10&appid=e3359107dd6692984f64be928b7d64ae`
      );
      console.log(res.data);
      //setCityName(res.data[0].name);
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
        <p>{date}</p>
        <p>{weekday}</p>
        <p>{cityName}</p>
        <p>{Math.round(temperature)} °C</p>
        <p>{weather}</p>

        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt='Logo'
        />

        {weather === 'Clear' && <p>Looks like a sunny day for your garden! </p>}
        {weather === 'Rain' && (
          <p>No need to water your plants outside today! </p>
        )}
        {weather === 'Clouds' && (
          <p>A good day for taking care of your plants!</p>
        )}
      </WeatherWrapper>
    </>
  );
};

export default Weather;
