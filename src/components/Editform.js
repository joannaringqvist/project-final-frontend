/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from 'utils/utils';
import {
  Formwrapper,
  InputWrapper,
  BtnWrapper,
  NameInput,
  TextInput,
  Dropdown,
} from './Styling/form_styles';
import { AddPlantImg, Addwrapper } from './Styling/addplant_styles';
import { StyledBtn } from './Styling/plantfeed_styles';
import swal from 'sweetalert';

import plants from 'reducers/plants';
import { th } from 'date-fns/locale';

const Editform = (props) => {
  const plantsList = useSelector((store) => store.plants.plants);
  const { plantId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPlant = plantsList.find((plant) => {
    return plant._id === plantId;
  });

  const [plantName, setPlantName] = useState(currentPlant.plantName);
  const [plantType, setPlantType] = useState(currentPlant.plantType);
  const [plantInformation, setplantInformation] = useState(
    currentPlant.plantInformation
  );
  const [imageUrl, setImageUrl] = useState(currentPlant.imageUrl);
  const [thumbnailUrl, setThumbnailUrl] = useState(currentPlant.thumbnailUrl);

  const handleEditNameChange = (event) => {
    setPlantName(event.target.value);
  };
  const handleEditTypeChange = (event) => {
    setPlantType(event.target.value);
  };
  const handleEditInformationChange = (event) => {
    setplantInformation(event.target.value);
  };

  const onEditPlantSubmit = (event) => {
    event.preventDefault();
    fetch(API_URL(`plant/${plantId}/updated`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plantName,
        plantType,
        plantInformation,
        imageUrl,
        thumbnailUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(plants.actions.updatePlant(data.response));
        swal({ text: 'Your plant is updated!', icon: 'success' });
        props.closePane();
      });
  };

  const onBackButtonClick = () => {
    props.closePane();
  };

  const [uploadedImage, setUploadedImage] = useState('');
  const uploadImage = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', uploadedImage);
    data.append('upload_preset', 'garden-planner-preset');
    data.append('cloud_name', 'garden-planner');
    fetch('https://api.cloudinary.com/v1_1/garden-planner/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        console.log(data.secure_url);
        setImageUrl(data.secure_url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={onBackButtonClick}>Cancel</button>
      <h1>Edit your plant</h1>
      <Formwrapper>
        <form onSubmit={onEditPlantSubmit}>
          <label htmlFor='plantName'>Name of plant</label>
          <InputWrapper>
            <NameInput
              id='plantName'
              type='text'
              value={plantName}
              onChange={handleEditNameChange}
            />
          </InputWrapper>
          <label htmlFor='plantType'>Type of plant</label>
          <InputWrapper>
            <Dropdown
              id='plantType'
              name='plant'
              value={plantType}
              onChange={handleEditTypeChange}
            >
              <option value=''>Select type of plant</option>
              <option value='tree'>Tree</option>
              <option value='houseplant'>Houseplant</option>
              <option value='perennial'>Perennial</option>
              <option value='bush'>Bush</option>
            </Dropdown>
          </InputWrapper>

          <label htmlFor='plantInformation'>Add more information</label>
          <InputWrapper>
            <TextInput
              id='plantInformation'
              value={plantInformation}
              onChange={handleEditInformationChange}
            />
          </InputWrapper>

          <input
            type='file'
            onChange={(e) => setUploadedImage(e.target.files[0])}
          />
          {uploadedImage && 
            <button onClick={uploadImage}>Upload image</button>
          }
          <img src={imageUrl} />
          <button type='submit'>Save plant</button>
        </form>
      </Formwrapper>
    </>
  );
};

export default Editform;
