/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import arrow from './images/arrow.png';

import { API_URL } from 'utils/utils';
import Navbar from './reusable-components/Navbar';
import {
  PlantWrapper,
  DeleteButton,
  DeleteIcon,
  PlantName,
  PlantAdd,
  PlantsLength,
  PlantsLengthWrapper,
  FilterWrapper,
  StyledBtnAdd,
  ButtonWrapper,
  PlantFeedWrapper,
  PlantBtnText,
  StyledDeleteBtn,
  ArrowImg,
  StyledBtn,
} from './Styling/plantfeed_styles';

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
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const [plantlist, setPlantlist] = useState([]);
  const [filteredList, setFilteredList] = useState(plantsList);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          <PlantBtnText>Add plants</PlantBtnText>
          <ArrowImg src={arrow}></ArrowImg>
          <StyledBtnAdd onClick={() => setState({ isPaneOpen: true })}>
            <img src={addicon}></img>
          </StyledBtnAdd>
        </ButtonWrapper>
        <FilterWrapper>
          <div className='filter-container'>
            <div>Filter by Category:</div>
            <div>
              <select
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
              </select>
            </div>
          </div>
        </FilterWrapper>
        <section>
          {filteredList.map((plant) => (
            <>
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
              </PlantWrapper>
            </>
          ))}
          <PlantsLengthWrapper>
            <PlantsLength>
              {plantsList.length === 0 &&
                "You have no plants yet. Let's add some plants!"}
              {plantsList.length > 0 &&
                `You have ${plantsList.length} plants registered.`}
            </PlantsLength>
          </PlantsLengthWrapper>
          <div>
            <SlidingPane
              className='some-custom-class'
              overlayClassName='some-custom-overlay-class'
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
