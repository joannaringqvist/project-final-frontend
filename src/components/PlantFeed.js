/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import arrow from './images/arrow.png';
import heart from './images/heart.png';

import { API_URL } from 'utils/utils';
import Navbar from './reusable-components/Navbar';
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
import { Dropdown } from './Styling/form_styles';
import { PlantfeedCardTextBold } from './Styling/profile_styling';

import deleteicon from './images/delete.svg';
import AddNewPlant from './AddNewPlantForm';
import addicon from './images/plus.svg';

import plants from 'reducers/plants';
import { ui } from 'reducers/ui';

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

  const [plantlist, setPlantlist] = useState([]);
  const [filteredList, setFilteredList] = useState(plantsList);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  const showFavourites = () => {
    return favouriteTasks;
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
          setPlantlist(data);
          console.log(filteredList);
        }
      });
  }, [accessToken]);

  const deleteOnePlant = (plantId) => {
    fetch(API_URL(`plant/${plantId}`), {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.response);
        dispatch(plants.actions.deletePlant(data.response));
        swal({ text: 'Your plant is deleted.', icon: 'success' });
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
          console.log(`${plantId} is favourite`);
        } else {
          console.log('didnt work');
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
  }, [selectedCategory]);

  return (
    isLoading === false && (
      <PlantFeedWrapper>
        <ButtonWrapper>
          <StyledBtn onClick={toProfile}>Back</StyledBtn>
          <AddWrapper>
            {/*<PlantBtnText>Add plants</PlantBtnText>
            <ArrowImg src={arrow}></ArrowImg>*/}
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
                <option value='bush'>bush</option>
                <option value='tree'>tree</option>
                <option value='houseplant'>houseplant</option>
                <option value='perennial'>perennial</option>
              </Dropdown>
              <StyledBtn onClick={showFavourites}>Favourites!</StyledBtn>
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
                <CheckBoxLabel>
                  {plant.isFavourite ? (
                    <FavouriteStar src={heart}></FavouriteStar>
                  ) : (
                    <p>No</p>
                  )}
                  Favourite
                  <ButtonCheckbox
                    className='checkbox'
                    type='checkbox'
                    name={plant._id}
                    id={plant._id}
                    checked={plant.isFavourite}
                    onChange={() => onTogglePlant(plant._id, plant.isFavourite)}
                  ></ButtonCheckbox>
                  <CheckboxContainer></CheckboxContainer>
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
              <AddNewPlant />
            </SlidingPane>
          </div>
        </section>
      </PlantFeedWrapper>
    )
  );
};

export default PlantFeed;
