/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import plants from 'reducers/plants';
import { ui } from 'reducers/ui';

import leaf from './images/leaf.png';
import heart from './images/heart.png';
import { API_URL } from 'utils/utils';
import {
  PlantWrapper,
  PlantName,
  PlantAdd,
  PlantsLength,
  PlantsLengthWrapper,
  FilterWrapper,
  StyledBtnAdd,
  ButtonWrapper,
  PlantFeedWrapper,
  StyledDeleteBtn,
  StyledBtn,
  PlantCardWrapper,
  AddWrapper,
  AddImg,
  ButtonCheckbox,
  CheckBoxLabel,
  CheckboxContainer,
  FavouriteStar,
} from './Styling/plantfeed_styles';
import { Logo, LogoImg, LogoText } from './Styling/header_styles';
import { Dropdown } from './Styling/form_styles';
import { PlantfeedCardTextBold } from './Styling/profile_styling';
import deleteicon from './images/delete.svg';
import AddNewPlant from './AddNewPlantForm';
import addicon from './images/plus.svg';

const PlantFeed = () => {
  const plantsList = useSelector((store) => store.plants.plants);
  const isLoading = useSelector((store) => store.ui.isLoading);
  const accessToken = useSelector((store) => store.user.accessToken);
  const bushCategory = plantsList.filter((plant) => plant.plantType === 'bush');
  const favouriteTasks = plantsList.filter(
    (plant) => plant.isFavourite === true
  );
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const [filteredList, setFilteredList] = useState(plantsList);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  const toProfile = () => {
    navigate('/profile');
  };

  if (!accessToken) {
    navigate('/login');
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    };
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL('plants'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(plants.actions.setPlants(data.response));
          dispatch(ui.actions.setLoading(false));
        }
      });
  }, [accessToken, state]);

  const deleteOnePlant = (plantId) => {
    fetch(API_URL(`plant/${plantId}`), {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        swal({ text: 'Your plant is deleted.', icon: 'success' });
        dispatch(plants.actions.deletePlant(data.response));
      });
  };

  const onTogglePlant = (plantId, isFavourite) => {
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
    fetch(API_URL(`plants/${plantId}/favourite`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(plants.actions.togglePlant(plantId));
        }
      });
  };
  const filterByCategory = (filteredData) => {
    if (!selectedCategory) {
      return filteredData;
    }

    const filteredPlants = filteredData.filter(
      (plant) => plant.plantType.split(' ').indexOf(selectedCategory) !== -1
    );
    return filteredPlants;
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    let filteredData = filterByCategory(plantsList);
    setFilteredList(filteredData);
  }, [selectedCategory, plantsList]);

  return (
    isLoading === false && (
      <PlantFeedWrapper>
        <ButtonWrapper>
          <StyledBtn onClick={toProfile}>Back</StyledBtn>
          <Logo>
            <LogoImg src={leaf} />
            <LogoText>Plantinary</LogoText>
          </Logo>
          <AddWrapper>
            <StyledBtnAdd onClick={() => setState({ isPaneOpen: true })}>
              <AddImg src={addicon}></AddImg>
            </StyledBtnAdd>
          </AddWrapper>
        </ButtonWrapper>

        <FilterWrapper>
          <div className='filter-container'>
            <div>
              <Dropdown
                className='dropdown'
                name='category-list'
                id='category-list'
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value=''>All</option>
                <option value='bush'>Bush</option>
                <option value='tree'>Tree</option>
                <option value='houseplant'>Houseplant</option>
                <option value='perennial'>Perennial</option>
                <option value='vegetable'>Vegetable</option>
                <option value='other'>Other</option>
              </Dropdown>
            </div>
          </div>
        </FilterWrapper>
        <PlantsLength>
          {plantsList.length === 0 &&
            "You have no plants yet. Let's add some plants!"}
          {plantsList.length > 0 &&
            `You have ${plantsList.length} plants registered.`}
        </PlantsLength>
        <section>
          {filteredList?.slice(0, visible).map((plant) => (
            <PlantCardWrapper>
              <PlantWrapper key={plant._id}>
                <Link
                  style={{ textDecoration: 'none' }}
                  key={plant._id}
                  to={`plant/${plant._id}`}
                >
                  <PlantName>{plant.plantName}</PlantName>
                </Link>
                <PlantAdd>{moment(plant.createdAt).fromNow()}</PlantAdd>
                <StyledDeleteBtn onClick={() => deleteOnePlant(plant._id)}>
                  <img src={deleteicon}></img>
                </StyledDeleteBtn>
                <CheckBoxLabel
                  style={
                    state.isPaneOpen
                      ? { display: 'none' }
                      : { display: 'inlineBlock' }
                  }
                >
                  {plant.isFavourite ? (
                    <FavouriteStar src={heart}></FavouriteStar>
                  ) : (
                    <p>No</p>
                  )}
                  Favourite
                  <ButtonCheckbox
                    style={
                      state.isPaneOpen
                        ? { display: 'none' }
                        : { display: 'inline' }
                    }
                    className='checkbox'
                    type='checkbox'
                    name={plant._id}
                    id={plant._id}
                    checked={plant.isFavourite}
                    onChange={() => onTogglePlant(plant._id, plant.isFavourite)}
                  ></ButtonCheckbox>
                  <CheckboxContainer
                    style={
                      state.isPaneOpen
                        ? { display: 'none' }
                        : { display: 'block' }
                    }
                  ></CheckboxContainer>
                </CheckBoxLabel>
              </PlantWrapper>
            </PlantCardWrapper>
          ))}
          <PlantsLengthWrapper>
            {plantsList.length >= 10 ? (
              <StyledBtn className='hey' onClick={showMoreItems}>
                Load more plants
              </StyledBtn>
            ) : (
              <p></p>
            )}
          </PlantsLengthWrapper>
          <div>
            <SlidingPane
              portalClassName='panestyle'
              overlayClassName='paneoverlay'
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
          </div>
        </section>
      </PlantFeedWrapper>
    )
  );
};

export default PlantFeed;
