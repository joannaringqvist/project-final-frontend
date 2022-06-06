/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import EditForm from './Editform';

import moment from 'moment';
import { ui } from 'reducers/ui';

const SinglePlant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBackButtonClick = () => {
    navigate(-1);
  };
  const isLoading = useSelector((store) => store.ui.isLoading);
  const { plantId } = useParams();
  const [plantInfo, setPlantInfo] = useState([]);
  const [editPlant, setEditPlant] = useState(false);

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL(`plant/${plantId}`))
      .then((res) => res.json())
      .then((data) => {
        setPlantInfo(data.data);
        dispatch(ui.actions.setLoading(false));
      });
  }, []);

  const navigateEdit = () => {
    navigate(`/plants/plant/${plantId}/update`);
  };

  return (
    isLoading === false && (
      <>
        <p>{plantInfo.plantName}</p>

        <p>{plantInfo.plantInformation}</p>
        <p>{plantInfo.plantType}</p>
        <p>{moment(plantInfo.createdAt).fromNow()}</p>
        <input type='checkbox'></input>
        <button onClick={onBackButtonClick}>BACK</button>
        <button onClick={navigateEdit}>EDIT</button>
      </>
    )
  );
};

export default SinglePlant;
