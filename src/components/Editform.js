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

  const handleEditNameChange = (event) => {
    setPlantName(event.target.value);
  };
  const handleEditTypeChange = (event) => {
    setPlantType(event.target.value);
  };
  const handleEditInformationChange = (event) => {
    setplantInformation(event.target.value);
  };
  const handleEditImageUrlChange = (event) => {
    setImageUrl(event.target.value);
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //props.setEditPlant(false);
        //handleEditImageUrlChange;
        dispatch(plants.actions.updatePlant(data.response));
        swal({ text: 'Your plant is updated!', icon: 'success' });
        props.closePane();
      });
  };

  const onBackButtonClick = () => {
    props.closePane();
    //navigate(`/plants/plant/${plantId}`);
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
        //const thumbnailUrl = result.info.thumbnail_url;
        console.log('imageUrl', imageUrl);

        setImageUrl(imageUrl);
      }
    }
  );

  const onClickUploadImage = () => {
    cldWidget.open();
  };

  const onClickDeleteImage = () => {
    console.log('delete image');
  };

  return (
    <>
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
          <BtnWrapper>
            <StyledBtn
              type='button'
              id='upload_widget'
              onClick={onClickUploadImage}
            >
              Edit image
            </StyledBtn>
            {/* Put image thumbnail here? */}
            <StyledBtn type='button' onClick={onClickDeleteImage}>
              Delete image
            </StyledBtn>
          </BtnWrapper>
          <BtnWrapper>
            <StyledBtn type='submit'>Save plant</StyledBtn>
            <StyledBtn onClick={onBackButtonClick}>Cancel</StyledBtn>
            {/* <button onClick={() => setState({ isPaneOpen: false })}>BACK</button> */}
          </BtnWrapper>
        </form>
      </Formwrapper>
    </>
  );
};

export default Editform;
