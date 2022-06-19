/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

import { API_URL } from 'utils/utils';
import plants from 'reducers/plants';

import { Formwrapper, InputWrapper } from './Styling/form_styles';
import gardenlady from './images/garden.png';
import { AddPlantImg, Addwrapper } from './Styling/addplant_styles';

import swal from 'sweetalert';
import { th } from 'date-fns/locale';

const AddNewPlantForm = (props) => {
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [plantInformation, setPlantInformation] = useState('');
  const [indoorOrOutdoor, setIndoorOrOutdoor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  if (!accessToken) {
    navigate('/login');
  }

  const dispatch = useDispatch();

  const resetForm = () => {
    setPlantName('');
    setPlantType('');
    setPlantInformation('');
  };

  const handlePlantNameChange = (event) => {
    setPlantName(event.target.value);
  };
  const handlePlantTypeChange = (event) => {
    setPlantType(event.target.value);
  };
  const handlePlantInformationChange = (event) => {
    setPlantInformation(event.target.value);
  };

  const handleIndoorOrOutdoor = (event) => {
    setIndoorOrOutdoor(event.target.value);
  };

  const onSaveNewPlantSubmit = (event) => {
    event.preventDefault();

    fetch(API_URL('plants'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        plantName,
        plantType,
        plantInformation,
        indoorOrOutdoor,
        imageUrl,
        thumbnailUrl
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.addPlant(data.response));
        swal({ text: 'Your plant is added!', icon: 'success' });
        resetForm();
        props.closePane();
      });
  };

  const cldWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'garden-planner',
      uploadPreset: 'garden-planner-preset',
    },
    (error, result) => {
      console.log('error', error);
      console.log('result', result);
      if (!error && result && result.event === 'success') {

        console.log('Done! Here is the image info: ', result.info);
        // secure_url: "https://res.cloudinary.com/garden-planner/image/upload/v1655400840/r8is30hgcaz1axpdzt0m.png"
        // path: "v1655400840/r8is30hgcaz1axpdzt0m.png"
        // public_id: "r8is30hgcaz1axpdzt0m"
        // thumbnail_url: "https://res.cloudinary.com/garden-planner/image/upload/c_limit,h_60,w_90/v1655400840/r8is30hgcaz1axpdzt0m.png"

        const imageUrl = result.info.secure_url;
        const thumbnailUrl = result.info.thumbnail_url;
        setImageUrl(imageUrl);
        setThumbnailUrl(thumbnailUrl);
        
      }
    }
  );

  const onClickUploadImage = () => {
    cldWidget.open();
  }

  return (
    <>
      <Addwrapper>
        <form onSubmit={onSaveNewPlantSubmit}>
          <label htmlFor='plantName'>Name of plant</label>
          <InputWrapper>
            <input
              id='plantName'
              type='text'
              value={plantName}
              onChange={handlePlantNameChange}
            />
          </InputWrapper>
          <label htmlFor='plantType'>Type of plant</label>
          <InputWrapper>
            <select
              id='plantType'
              name='plant'
              value={plantType}
              onChange={handlePlantTypeChange}
            >
              <option value=''>Select type of plant</option>
              <option value='tree'>Tree</option>
              <option value='houseplant'>Houseplant</option>
              <option value='perennial'>Perennial</option>
              <option value='bush'>Bush</option>
            </select>
          </InputWrapper>
          <label htmlFor='plantInformation'>Add more information</label>
          <InputWrapper>
            <textarea
              id='plantInformation'
              value={plantInformation}
              onChange={handlePlantInformationChange}
            />
          </InputWrapper>
          <label htmlFor='IndoorOrOutdoor'>Indoor or outdoor plant?</label>
          <InputWrapper>
            <input
              type='radio'
              value='Indoor'
              name='indoorOrOutdoor'
              onChange={handleIndoorOrOutdoor}
            />{' '}
            Indoor
            <input
              type='radio'
              value='Outdoor'
              name='indoorOrOutdoor'
              onChange={handleIndoorOrOutdoor}
            />{' '}
            Outdoor
          </InputWrapper>
          <p>ADD IMAGE</p>
          <button type='button' id='upload_widget' onClick={onClickUploadImage}>Upload image</button>
          <button type='submit'>Save plant</button>
        </form>
        <AddPlantImg src={gardenlady}></AddPlantImg>
      </Addwrapper>
    </>
  );
};

export default AddNewPlantForm;
