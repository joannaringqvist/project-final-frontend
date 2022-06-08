/* eslint-disable */
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { startOfWeek } from 'date-fns';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { EventInput, AddEventBtn } from './Styling/calendar_style';

const locales = {
  'en-GB': require('date-fns/locale/en-GB'),
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
    title: 'Big Meeting',
    allday: true,
    start: new Date(2022, 5, 1),
    end: new Date(2022, 5, 4),
  },
  {
    title: 'Vacation',
    start: new Date(2022, 6, 0),
    end: new Date(2022, 6, 0),
  },
];

export const PlantCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);
  const navigate = useNavigate();

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  const backToProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      <h1>Calendar</h1>
      <h2>What do you need to help your plants with?</h2>
      <EventInput>
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
        <AddEventBtn onClick={handleAddEvent}>Add event</AddEventBtn>
      </EventInput>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500, margin: '50px' }}
      />
      <button onClick={backToProfile}>Back</button>
    </div>
  );
};

export default PlantCalendar;
