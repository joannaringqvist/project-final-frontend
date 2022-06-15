/* eslint-disable */
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { API_URL } from 'utils/utils';

import { ui } from 'reducers/ui';
import eventTodos from 'reducers/events';

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

const events = [{}];

const PlantCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allEvents, setAllEvents] = useState(events);
  const eventsList = useSelector((store) => store.eventTodos.events);
  const dispatch = useDispatch();

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

  const handleAddEvent = (event) => {
    event.preventDefault();
    console.log(newEvent);
    fetch(API_URL('calendarevents'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEvent }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(eventTodos.actions.addEvent(data.response));
        setAllEvents([...allEvents, newEvent]);
        console.log(newEvent.start);
        console.log(typeof newEvent.start);
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

  return (
    <div className='App'>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type='text'
          placeholder='Add Title'
          style={{ width: '20%', marginRight: '10px' }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText='Start Date'
          style={{ marginRight: '10px' }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText='End Date'
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button style={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500, margin: '50px' }}
      />
      {eventsList.map((event) => (
        <div key={event._id}>
          <p>{event.eventTitle}</p>
          <p> {moment(event.startDate).format('MMM Do YY')}</p>
          <p> {moment(event.endDate).format('MMM Do YY')}</p>
          <button onClick={deleteEvent}>DELETE EVENT</button>
        </div>
      ))}
    </div>
  );
};

export default PlantCalendar;
