/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { startOfWeek } from 'date-fns';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { EventInput, AddEventBtn } from './Styling/calendar_style';
import { API_URL } from 'utils/utils';

import eventTodos from 'reducers/events';
import { ui } from 'reducers/ui';

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

const events = [
  {
    eventTitle: 'Big Meeting',
    allDay: true,
    startDate: new Date(2021, 6, 0),
    endDate: new Date(2021, 6, 0),
  },
];

const PlantCalendar = () => {
  const [newEvent, setNewEvent] = useState({
    eventTitle: '',
    startDate: '',
    endDate: '',
  });
  const [allEvents, setAllEvents] = useState(events);
  const [eventTitle, setEventTitle] = useState('');
  const eventsList = useSelector((store) => store.eventTodos.events);
  const dispatch = useDispatch();
  const onChangeEventTitle = (e) => {
    setNewEvent({ ...newEvent, eventTitle: e.target.value });
    setEventTitle();
  };
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL('calendarevents'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(eventTodos.actions.setEvent(data.response));
          dispatch(ui.actions.setLoading(false));
          console.log(data);
        }
      });
  }, []);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);

    fetch(API_URL('calendarevents'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventTitle }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(eventTodos.actions.addEvent(data.response));
        setEventTitle('');
      });
  };

  return (
    <div className='App'>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type='text'
          placeholder='Add Title'
          style={{ width: '20%', marginRight: '10px' }}
          value={newEvent.eventTitle}
          onChange={onChangeEventTitle}
        />
        <DatePicker
          placeholderText='Start Date'
          style={{ marginRight: '10px' }}
          selected={newEvent.startDate}
          onChange={(startDate) => setNewEvent({ ...newEvent, startDate })}
        />
        <DatePicker
          placeholderText='End Date'
          selected={newEvent.endDate}
          onChange={(endDate) => setNewEvent({ ...newEvent, endDate })}
        />
        <button style={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor='startDate'
        endAccessor='endDate'
        style={{ height: 500, margin: '50px' }}
      />
      {eventsList.map((event) => (
        <div key={event._id}>
          <p>{event.eventTitle}</p>
          <p> {moment(event.startDate).format('MMM Do YY')}</p>

          <button onClick={() => deleteEvent(event._id)}>DELETE</button>
        </div>
      ))}
    </div>
  );
};

export default PlantCalendar;
