/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from 'utils/utils';
import plants from 'reducers/plants';

import {
  Formwrapper,
  InputWrapper,
  StyledBtn,
  NameInput,
  TextInput,
  Dropdown,
  InputWrapperImage,
  EditAddPlantImage
} from './Styling/form_styles';
import gardenlady from './images/garden.png';
import arrow from './images/arrow.png';
import star from './images/star.png';
import {
  AddPlantImg,
  Addwrapper,
  BackBtn,
  BackBtnImg,
} from './Styling/addplant_styles';

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
        thumbnailUrl,
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
      <Addwrapper>
        <form onSubmit={onSaveNewPlantSubmit}>
          <div>
            <BackBtnImg onClick={onBackButtonClick} src={arrow}></BackBtnImg>
          </div>
          <label htmlFor='plantName'>Name of plant</label>
          <InputWrapper>
            <NameInput
              id='plantName'
              type='text'
              value={plantName}
              onChange={handlePlantNameChange}
            />
          </InputWrapper>
          <label htmlFor='plantType'>Type of plant</label>
          <InputWrapper>
            <Dropdown
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
              <option value='vegetable'>Vegetable</option>
              <option value='other'>Other</option>
            </Dropdown>
          </InputWrapper>
          <label htmlFor='plantInformation'>Add more information</label>
          <InputWrapper>
            <TextInput
              id='plantInformation'
              value={plantInformation}
              onChange={handlePlantInformationChange}
            />
          </InputWrapper>
          <InputWrapperImage>
            <p>Add image:</p>
            <input
              type='file'
              onChange={(e) => setUploadedImage(e.target.files[0])}
            />
            {uploadedImage && (
              <StyledBtn onClick={uploadImage}>Upload image</StyledBtn>
            )}
            {imageUrl && <EditAddPlantImage src={imageUrl} width='300' />}
          </InputWrapperImage>
          <StyledBtn type='submit'>Save plant</StyledBtn>
        </form>
        <AddPlantImg src={gardenlady}></AddPlantImg>
      </Addwrapper>
    </>
  );
};

export default AddNewPlantForm;
