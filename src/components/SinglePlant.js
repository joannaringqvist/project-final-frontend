/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import plants from 'reducers/plants';
import { ui } from 'reducers/ui';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import { API_URL } from 'utils/utils';
import Editform from './Editform';
import { Cloudinary } from '@cloudinary/url-gen';
import {
  ImgContainer,
  SingleTextContainer,
  SingleTextDiv,
  PlantText,
  PlantNameText,
  SingleButtonWrapper,
  SingleWrapper,
  PlantImage
} from './Styling/singleplant_styles';
import { LogoTwo, LogoImg, LogoText, HeaderWrapper } from './Styling/header_styles';
import { InvisibleDiv } from './Styling/calendar_style';
import { StyledBtn, ButtonWrapper } from './Styling/plantfeed_styles';

import leaf from './images/leaf.png';

const SinglePlant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBackButtonClick = () => {
    navigate('/plants/');
  };

  const plantsList = useSelector((store) => store.plants.plants);
  const isLoading = useSelector((store) => store.ui.isLoading);
  const { plantId } = useParams();
  const [plantInfo, setPlantInfo] = useState([]);
  const [editPlant, setEditPlant] = useState(false);
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
  }, [state]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'garden-planner',
    },
  });

  if (editPlant) {
    return <Editform />;
  }

  return (
    isLoading === false && (
      <>
        <HeaderWrapper>
          <ButtonWrapper>
            <StyledBtn onClick={onBackButtonClick}>Back</StyledBtn>
          </ButtonWrapper>
          <LogoTwo>
            <LogoImg src={leaf} />
            <LogoText>Plantinary</LogoText>
          </LogoTwo>
          <InvisibleDiv></InvisibleDiv>
        </HeaderWrapper>
        <SingleWrapper>
          <ImgContainer>
            {plantInfo.imageUrl && <PlantImage src={plantInfo.imageUrl} />}
          </ImgContainer>
          <SingleTextContainer>
            <SingleTextDiv>
              <PlantText>Plantname:</PlantText>
              <PlantNameText> {plantInfo.plantName}</PlantNameText>
            </SingleTextDiv>
            <SingleTextDiv>
              <PlantText>Type of plant:</PlantText>
              <span> {plantInfo.plantType}</span>
            </SingleTextDiv>
            <PlantText>More information about plant:</PlantText>
            <p>{plantInfo.plantInformation}</p>
            <PlantText>Created at:</PlantText>
            <span> {moment(plantInfo.createdAt).fromNow()}</span>
          </SingleTextContainer>
        </SingleWrapper>
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
        </SlidingPane>
      </>
    )
  );
};

export default SinglePlant;
