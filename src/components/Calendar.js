/* eslint-disable */
import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ui } from 'reducers/ui';
import eventTodos from 'reducers/events';

import plant from './images/pearls.png';
import { API_URL } from 'utils/utils';
import {
  AddEventWrapper,
  TitleText,
  CalendarImg,
  DateText,
  DeleteWrapper,
  ButtonWrapper,
  DatePickerWrap,
  HeaderWrapper,
  InvisibleDiv,
} from './Styling/calendar_style';
import { LogoTwo, LogoImg, LogoText } from './Styling/header_styles';
import { StyledBtn } from './Styling/plantfeed_styles';
import leaf from './images/leaf.png';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const PlantCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [isShown, setIsShown] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const eventsList = useSelector((store) => store.eventTodos.events);
  const [allEvents, setAllEvents] = useState([]);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = moment().format('MMMM Do');
  const weekday = moment().format('dddd');

  const backToProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    };
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL('calendarevents'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(eventTodos.actions.setEvent(data.response));
          dispatch(ui.actions.setLoading(false));
        }
      });
  }, [accessToken]);

  const handleAddEvent = (event) => {
    event.preventDefault();
    fetch(API_URL('calendarevents'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },

      body: JSON.stringify({ newEvent }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(eventTodos.actions.addEvent(data.response));
        setAllEvents([...allEvents, newEvent]);
        console.log(allEvents);
      });
  };

  const deleteEvent = (eventId) => {
    fetch(API_URL(`event/${eventId}`), {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(eventTodos.actions.deleteEvent(data.response));
      });
  };

  const events = eventsList.map(
    (event) =>
      (event = {
        title: event.eventTitle,
        start: moment(event.startDate).toDate(),
        end: moment(event.endDate).toDate(),
      })
  );

  const eventStyleGetter = (newEvent) => {
    let style = {
      backgroundColor: '#C1AC95',
      border: 'white',
    };
    return {
      style: style,
    };
  };

  const dayStyleGetter = (newEvent) => {
    let style = {
      backgroundColor: '#FAEBE0',
      border: 'white',
    };
    return {
      style: style,
    };
  };

  const selectedEvent = () => {
    setIsShown((current) => !current);
  };

  return (
    <div className='App'>
      <HeaderWrapper>
        <ButtonWrapper>
          <StyledBtn onClick={backToProfile}>Back</StyledBtn>
        </ButtonWrapper>
        <LogoTwo>
          <LogoImg src={leaf} />
          <LogoText>Plantinary</LogoText>
        </LogoTwo>
        <InvisibleDiv></InvisibleDiv>
      </HeaderWrapper>
      <AddEventWrapper>
        <h1>Your calendar</h1>
        <DateText>{date}</DateText>
        <DateText> {weekday}</DateText>
        <CalendarImg src={plant}></CalendarImg>
        <TitleText
          type='text'
          placeholder='Add your planttask'
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePickerWrap>
          <DatePicker
            placeholderText='Start Date'
            style={{ margin: '10px' }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
        </DatePickerWrap>
        <DatePickerWrap>
          <DatePicker
            wrapperClassName='date-picker'
            style={{ marginLeft: '300px' }}
            placeholderText='End Date'
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
        </DatePickerWrap>
        <StyledBtn style={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </StyledBtn>
      </AddEventWrapper>
      {eventsList.map((event) => (
        <div key={event._id}>
          {isShown && (
            <DeleteWrapper>
              <StyledBtn onClick={() => deleteEvent(event._id)}>
                Delete event
              </StyledBtn>
            </DeleteWrapper>
          )}
        </div>
      ))}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{
          height: 500,
          margin: '50px',
          position: 'relative',
          fontFamily: 'Lora, serif',
        }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayStyleGetter}
        onSelectEvent={() => selectedEvent()}
      />
      <div></div>
    </div>
  );
};

export default PlantCalendar;
