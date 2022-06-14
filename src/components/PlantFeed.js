/* eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from 'utils/utils';
import moment from 'moment';
import { PlantWrapper } from './plantfeed_styles';
import Navbar from './reusable-components/Navbar';
import plants from 'reducers/plants';
import { ui } from 'reducers/ui';
import Loading from './Loading';
import user from 'reducers/user';

const PlantFeed = () => {
  const plantsList = useSelector((store) => store.plants.plants);
  const isLoading = useSelector((store) => store.ui.isLoading);
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const bushCategory = plantsList.filter((plant) => plant.plantType === 'bush');

  const [plantlist, setPlantlist] = useState([]);
  const [filteredList, setFilteredList] = useState(plantsList);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = ['bush', 'tree', 'perennial', 'houseplant'];

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
        <Navbar />
        <div>
          <p>Plantfeed for {username}!</p>
          <button
            type='button'
            onClick={() => {
              dispatch(user.actions.setAccessToken(null));
              navigate('/login');
            }}
          >
            Log out
          </button>
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
        </div>
        <section>
          {filteredList.map((plant) => (
            <PlantWrapper key={plant._id}>
              <Link key={plant._id} to={`plant/${plant._id}`}>
                {plant.plantName}
              </Link>
              <div>{moment(plant.createdAt).fromNow()}</div>

              <button onClick={() => deleteOnePlant(plant._id)}>
                DELETE PLANT
              </button>
            </PlantWrapper>
          ))}
          <p>You have {plantsList.length} plants registred.</p>
        </section>
      </>
    )
  );
};

export default PlantFeed;
