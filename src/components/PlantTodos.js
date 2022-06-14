/* eslint-disable */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import eventTodos from 'reducers/events';
import { ui } from 'reducers/ui';
import user from 'reducers/user';
import { API_URL } from 'utils/utils';

const PlantTodos = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const eventsList = useSelector((store) => store.eventTodos.events);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [eventTitle, setEventTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

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
          console.log(data);
        }
      });
  }, [accessToken]);

  const handleEventTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const onSaveEvent = (event) => {
    event.preventDefault();

    fetch(API_URL('calendarevents'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',         
        Authorization: accessToken,
    },
      body: JSON.stringify({ eventTitle, startDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(eventTodos.actions.addEvent(data.response));
        setEventTitle('');
        console.log(startDate);
        console.log(typeof startDate);
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

  const onToggleTodo = (eventId, isCompleted) => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        isCompleted: !isCompleted,
        _id: eventId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL(`calendarevents/${eventId}/completed`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(eventTodos.actions.toggleTodo(eventId));
          dispatch(ui.actions.setLoading(false));
          console.log('is completed!');
        }
      });
  };

  return (
    <>
      <p>Hello!</p>
      <p>You</p>
      <p>What do you need to do?</p>
      <input
        type='text'
        value={eventTitle}
        onChange={handleEventTitleChange}
      ></input>
      <p>When do you need to do it?</p>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      <button onClick={onSaveEvent}>SAVE</button>
      {eventsList.map((event) => (
        <div key={event._id}>
          <p>{event.eventTitle}</p>
          <p> {moment(event.startDate).format('MMM Do YY')}</p>

          <button onClick={() => deleteEvent(event._id)}>DELETE</button>
          <input
            type='checkbox'
            checked={event.isCompleted}
            onChange={() => onToggleTodo(event._id, event.isCompleted)}
          />
        </div>
      ))}
    </>
  );
};

export default PlantTodos;
