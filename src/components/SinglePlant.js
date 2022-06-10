/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import plants from 'reducers/plants';
import moment from 'moment';
import { ui } from 'reducers/ui';
import { editPlants } from 'reducers/plants';
import Editform from './Editform';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

const SinglePlant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBackButtonClick = () => {
    navigate(-1);
  };
  const plantsList = useSelector((store) => store.plants.plants);
  const isLoading = useSelector((store) => store.ui.isLoading);
  const { plantId } = useParams();
  const [plantInfo, setPlantInfo] = useState([]);
  const [editPlant, setEditPlant] = useState(false);
  const [newPlantName, setNewPlantName] = useState('');

  useEffect(() => {
    dispatch(ui.actions.setLoading(true));
    fetch(API_URL(`plant/${plantId}`))
      .then((res) => res.json())
      .then((data) => {
        setPlantInfo(data.data);
        dispatch(ui.actions.setLoading(false));
      });
  }, []);

  const onEditClick = () => {
    setEditPlant(true);
  };
  const disableNewLines = (e) => {
    e.preventDefault();
  };

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
    console.log(newPlantName);
  };

  // -------- CLOUDINARY --------
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'garden-planner',
    },
    //url: 'https://res.cloudinary.com/garden-planner/image/upload/v1654781197/test/IMG_9052_zzibtf.jpg'
} );

  // cld.image returns a CloudinaryImage with the configuration set.
  const myImage = cld.image('test/IMG_9052_zzibtf');
  // -------- CLOUDINARY --------

  if (editPlant) {
    return <Editform />;
  }

  return (
    isLoading === false && (
      <>
        <div>Hejsan
          <AdvancedImage cldImg={myImage} style={{width: '250px'}} />
        </div>
        {/* <CloudinaryContext cloudName="garden-planner">
        <div>
          <Image publicId="cld-sample-5" width="50" />
        </div>
          <Image publicId="cld-sample-5" width="0.5" />
        </CloudinaryContext> */}

        <p
          onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}
          onChange={(e) => updatedPlantName(e)}
        >
          {plantInfo.plantName}
        </p>
        <p onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}>
          {plantInfo.plantInformation}
        </p>
        <p onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}>
          {plantInfo.plantType}
        </p>
        <p onKeyPress={(e) => e.key === 'Enter' && disableNewLines(e)}>
          {moment(plantInfo.createdAt).fromNow()}
        </p>
        <input type='checkbox'></input>
        <button onClick={onBackButtonClick}>BACK</button>
        {!editPlant && <button onClick={onEditClick}>EDIT</button>}
        {editPlant && (
          <button onClick={() => onUpdatePlant(plantId)}>SAVE</button>
        )}
      </>
    )
  );
};

export default SinglePlant;
