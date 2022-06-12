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
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
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
      setSunrise(res.data.current.sunrise);
      setSunset(res.data.current.sunset);
      setWeather(res.data.current.weather[0].description);
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
        <p>{date}</p>
        <p>{weekday}</p>
        <p>{cityName}</p>
        <p>{Math.round(temperature)} °C</p>
        <p>{weather}</p>
        {(weather === 'clear sky', 'overcast clouds') && (
          <p>Looks like a great day for your garden! </p>
        )}
      </WeatherWrapper>
    </>
  );
};

export default Weather;
