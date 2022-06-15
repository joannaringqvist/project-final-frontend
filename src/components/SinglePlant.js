/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import { API_URL } from 'utils/utils';
import Editform from './Editform';
import Navbar from './reusable-components/Navbar';
import {
  HiddenCheck,
  CheckboxLabel,
  CheckboxContainer,
} from './Styling/singleplant_styles';

import plants from 'reducers/plants';
import { ui } from 'reducers/ui';

const SinglePlant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBackButtonClick = () => {
    navigate(-1);
  };

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
  }, []);

  const onFavourite = () => {
    setIsFavourite(true);
    console.log(isFavourite);
  };

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
        <p>{plantInfo.plantName}</p>
        <p>{plantInfo.plantInformation}</p>
        <p>{plantInfo.plantType}</p>
        <p>{plantInfo.indoorOrOutdoor}</p>
        <p>{moment(plantInfo.createdAt).fromNow()}</p>
        <button onClick={onBackButtonClick}>BACK</button>
        {/*<CheckboxLabel>
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
        <input
          label='Favourite'
          type='checkbox'
          checked={plantInfo.isFavourite}
          onChange={() => togglePlant(plantInfo._id, plantInfo.isFavourite)}
        />

        <button onClick={() => setState({ isPaneOpen: true })}>
          Edit plant!
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
          <Editform />
        </SlidingPane>
      </>
    )
  );
};

export default SinglePlant;
