/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import {
  PlantfeedCard,
  PlantfeedCardTwo,
  PlantfeedCardText,
  PlantfeedCardTextBold,
  PlantLady,
  PlantfeedBtnWrapper,
} from './Styling/profile_styling';
import { StyledBtn } from './Styling/plantfeed_styles';
import plantgirl from './images/girlplant.png';

import eventTodos from 'reducers/events';

const CalendarProfile = () => {
  const navigate = useNavigate();
  const eventsList = useSelector((store) => store.eventTodos.events);

  const navigateCalendar = () => {
    navigate('/calendar');
  };

  if (eventsList.length === 0) {
    return (
      <>
        <PlantfeedCard>
          <PlantLady src={plantgirl}></PlantLady>
          <PlantfeedCardText>
            You don't have <PlantfeedCardTextBold>any</PlantfeedCardTextBold>{' '}
            planttasks yet. Don't you have something you need to do?
          </PlantfeedCardText>
        </PlantfeedCard>
        <PlantfeedBtnWrapper>
          <StyledBtn onClick={navigateCalendar}>Calendar</StyledBtn>
        </PlantfeedBtnWrapper>
      </>
    );
  } else {
    return (
      <>
        <PlantfeedCardTwo>
          <PlantLady src={plantgirl}></PlantLady>
          <PlantfeedCardText>
            You have{' '}
            <PlantfeedCardTextBold>{eventsList.length}</PlantfeedCardTextBold>{' '}
            planttasks to do! No time to loose!
          </PlantfeedCardText>
        </PlantfeedCardTwo>
        <PlantfeedBtnWrapper>
          <StyledBtn onClick={navigateCalendar}>Calendar</StyledBtn>
        </PlantfeedBtnWrapper>
      </>
    );
  }
};

export default CalendarProfile;
