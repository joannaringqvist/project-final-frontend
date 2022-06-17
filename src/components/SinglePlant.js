/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import { API_URL } from 'utils/utils';
import Editform from './Editform';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import Navbar from './reusable-components/Navbar';
import {
  ImgContainer,
  SingleTextContainer,
  SingleTextDiv,
  PlantText,
  PlantNameText,
  SingleButtonWrapper,
} from './Styling/singleplant_styles';
import { StyledBtn } from './Styling/plantfeed_styles';

import plants from 'reducers/plants';
import { ui } from 'reducers/ui';

const SinglePlant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBackButtonClick = () => {
    //navigate(-1);
    navigate('/plants/');
  };

  const plantsList = useSelector((store) => store.plants.plants);
  const isLoading = useSelector((store) => store.ui.isLoading);
  const { plantId } = useParams();
  const [plantInfo, setPlantInfo] = useState([]);
  const [editPlant, setEditPlant] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL(`plant/${plantId}`))
      .then((res) => res.json())
      .then((data) => {
        setPlantInfo(data.data);
        dispatch(ui.actions.setLoading(false));
      });
  }, [editPlant]);

  // const onEditClick = () => {
  //   setEditPlant(true);
  // };

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
  };

  // -------- CLOUDINARY --------
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'garden-planner',
    },
    //url: 'https://res.cloudinary.com/garden-planner/image/upload/v1654781197/test/IMG_9052_zzibtf.jpg'
  });

  // cld.image returns a CloudinaryImage with the configuration set.
  const myImage = cld.image('test/IMG_9052_zzibtf');
  // -------- CLOUDINARY --------

  if (editPlant) {
    return <Editform />;
  }

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
        }
      });
  };

  return (
    isLoading === false && (
      <>
        <ImgContainer>
          <AdvancedImage
            cldImg={myImage}
            style={{ width: '250px', borderRadius: '20px' }}
          />
        </ImgContainer>
        {/* <CloudinaryContext cloudName="garden-planner">
        <div>
          <Image publicId="cld-sample-5" width="50" />
        </div>
          <Image publicId="cld-sample-5" width="0.5" />
        </CloudinaryContext> */}
        <SingleTextContainer>
          <SingleTextDiv>
            <PlantText>Plantname:</PlantText>
            <PlantNameText> {plantInfo.plantName}</PlantNameText>
          </SingleTextDiv>
          <SingleTextDiv>
            <PlantText>Type of plant:</PlantText>
            <span> {plantInfo.plantType}</span>
          </SingleTextDiv>
          <SingleTextDiv>
            <PlantText>Indoor our outdoor?</PlantText>
            <span> {plantInfo.indoorOrOutdoor}</span>
          </SingleTextDiv>
          <PlantText>More information about plant:</PlantText>
          <p>{plantInfo.plantInformation}</p>
          <PlantText>Created at:</PlantText>
          <span> {moment(plantInfo.createdAt).fromNow()}</span>
        </SingleTextContainer>
        {/*<CheckboxLabel>git branch
          Favourite
          <HiddenCheck
            className='checkbox'
            type='checkbox'
            name={plantInfo._id}
            id={plantInfo._id}
            checked={plantInfo.isFavourite}
            onChange={() => togglePlant(plantInfo._id, plantInfo.isFavourite)}
          ></HiddenCheck>
          <CheckboxContainer></CheckboxContainer>
    </CheckboxLabel>*/}
        <SingleButtonWrapper>
          <StyledBtn onClick={onBackButtonClick}>BACK</StyledBtn>

          <StyledBtn onClick={() => setState({ isPaneOpen: true })}>
            Edit plant!
          </StyledBtn>
        </SingleButtonWrapper>
        <SlidingPane
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          isOpen={state.isPaneOpen}
          hideHeader
          onRequestClose={() => {
            setState({ isPaneOpen: false });
          }}
        >
          <Editform
            closePane={() => {
              setState({ isPaneOpen: false });
            }}
          />

          {/* <button onClick={() => setState({ isPaneOpen: false })}>BACK NEW</button> */}

          {/* <BackButton /> */}
        </SlidingPane>
      </>
    )
  );
};

export default SinglePlant;
