/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import plants from 'reducers/plants';
import moment from 'moment';
import { ui } from 'reducers/ui';
import { editPlants } from 'reducers/plants';
import Editform from './Editform';
import Navbar from './reusable-components/Navbar';

const SinglePlant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBackButtonClick = () => {
    navigate(-1);
  };
  const plantsList = useSelector((store) => store.plants.plants);
  const isLoading = useSelector((store) => store.ui.isLoading);
  const { plantId } = useParams();
  const [plantInfo, setPlantInfo] = useState([]);
  const [editPlant, setEditPlant] = useState(false);
  const [newPlantName, setNewPlantName] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL(`plant/${plantId}`))
      .then((res) => res.json())
      .then((data) => {
        setPlantInfo(data.data);
        dispatch(ui.actions.setLoading(false));
      });
  }, []);

  const onEditClick = () => {
    setEditPlant(true);
  };
  const disableNewLines = (e) => {
    e.preventDefault();
  };

  const onUpdatePlant = (plantId) => {
    setEditPlant(false);
    fetch(API_URL(`plant/${plantId}/updated`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPlantName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const updatedPlantName = (event) => {
    setNewPlantName(event.target.value);
    console.log(newPlantName);
  };

  const togglePlant = (plantId, isFavourite) => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        isFavourite: !isFavourite,
        _id: plantId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL(`plants/${plantId}/favourite`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(plants.actions.togglePlant(plantId));
          dispatch(ui.actions.setLoading(false));
          setIsFavourite();
          console.log('is completed!');
        }
      });
  };

  if (editPlant) {
    return <Editform />;
  }
  return (
    isLoading === false && (
      <>
        <Navbar />
        <p
          onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}
          onChange={(e) => updatedPlantName(e)}
        >
          {plantInfo.plantName}
        </p>
        <p onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}>
          {plantInfo.plantInformation}
        </p>
        <p onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}>
          {plantInfo.plantType}
        </p>
        <p onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}>
          {moment(plantInfo.createdAt).fromNow()}
        </p>
        <button onClick={onBackButtonClick}>BACK</button>
        <input
          type='checkbox'
          checked={plantInfo.isFavourite}
          onChange={() => togglePlant(plantInfo._id, plantInfo.isFavourite)}
        />
        Favourite
        {!editPlant && <button onClick={onEditClick}>EDIT</button>}
        {editPlant && (
          <button onClick={() => onUpdatePlant(plantId)}>SAVE</button>
        )}
      </>
    )
  );
};

export default SinglePlant;
