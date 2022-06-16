/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import { PlantfeedCard, PlantfeedCardText } from './Styling/profile_styling';

import eventTodos from 'reducers/events';

const CalendarProfile = () => {
  const navigate = useNavigate();
  const eventsList = useSelector((store) => store.eventTodos.events);

  const navigateCalendar = () => {
    navigate('/calendar');
  };

  if (eventsList.length === 0) {
    return (
      <PlantfeedCard>
        <PlantfeedCardText>
          You don't have any planttasks yet. Don't you have something you need
          to do?
        </PlantfeedCardText>
        <button onClick={navigateCalendar}>Calendar</button>
      </PlantfeedCard>
    );
  } else {
    return (
      <PlantfeedCard>
        <PlantfeedCardText>
          You have {eventsList.length} planttasks to do! No time to loose!
        </PlantfeedCardText>
        <button onClick={navigateCalendar}>Calendar</button>
      </PlantfeedCard>
    );
  }
};

export default CalendarProfile;
