/* eslint-disable */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import AddNewPlant from './AddNewPlantForm';
import {
  PlantfeedCard,
  PlantfeedCardText,
  PlantLady,
  PlantfeedCardTextBold,
  PlantfeedBtnWrapper,
} from './Styling/profile_styling';
import plantlady from './images/plantlady.png';
import { StyledBtn } from './Styling/plantfeed_styles';

const PlantfeedProfile = () => {
  const plantList = useSelector((store) => store.plants.plants);
  const navigate = useNavigate();

  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const navigatePlantfeed = () => {
    navigate('/plants');
  };

  if (plantList.length === 0) {
    return (
      <>
        <PlantfeedCard>
          <PlantLady src={plantlady}></PlantLady>
          <PlantfeedCardText>
            You have <PlantfeedCardTextBold>no</PlantfeedCardTextBold> plants
            yet. Go add some!
          </PlantfeedCardText>
        </PlantfeedCard>
        <PlantfeedBtnWrapper>
          <StyledBtn onClick={navigatePlantfeed}>Plantfeed</StyledBtn>
          <StyledBtn onClick={() => setState({ isPaneOpen: true })}>
            Add plant
          </StyledBtn>
        </PlantfeedBtnWrapper>
      </>
    );
  } else {
    return (
      <>
        <PlantfeedCard>
          <PlantLady src={plantlady}></PlantLady>
          <PlantfeedCardText>
            You have{' '}
            <PlantfeedCardTextBold>{plantList.length}</PlantfeedCardTextBold>{' '}
            plants registered. Go take a look at your loved ones!
          </PlantfeedCardText>
        </PlantfeedCard>
        <PlantfeedBtnWrapper>
          <StyledBtn onClick={navigatePlantfeed}>Plantfeed</StyledBtn>
          <StyledBtn onClick={() => setState({ isPaneOpen: true })}>
            Add plant
          </StyledBtn>
        </PlantfeedBtnWrapper>
        <SlidingPane
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          isOpen={state.isPaneOpen}
          hideHeader
          onRequestClose={() => {
            setState({ isPaneOpen: false });
          }}
        >
          <AddNewPlant
            closePane={() => {
              setState({ isPaneOpen: false });
            }}
          />
        </SlidingPane>
      </>
    );
  }
};

export default PlantfeedProfile;
