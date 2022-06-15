/* eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import { API_URL } from 'utils/utils';
import { PlantWrapper } from './plantfeed_styles';
import Navbar from './reusable-components/Navbar';
import {
  DeleteButton,
  DeleteIcon,
  PlantName,
  PlantAdd,
  PlantsLength,
  PlantsLengthWrapper,
  FilterWrapper,
} from './Styling/plantfeed_styles';
import deleteicon from './images/deleteicon.png';
import AddNewPlant from './AddNewPlantForm';

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

  if (!accessToken) {
    navigate('/login');
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

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
      <>
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
                <DeleteButton onClick={() => deleteOnePlant(plant._id)}>
                  <DeleteIcon src={deleteicon} />
                </DeleteButton>
              </PlantWrapper>
            </>
          ))}
          <PlantsLengthWrapper>
            <PlantsLength>
              {plantsList.length === 0 &&
                "You have no plants yet! Let's add some plants!"}
              {plantsList.length > 0 &&
                `You have ${plantsList.length} plants registered.`}
            </PlantsLength>
          </PlantsLengthWrapper>
          <div>
            <button onClick={() => setState({ isPaneOpen: true })}>
              Add plant!
            </button>
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
      </>
    )
  );
};

export default PlantFeed;
