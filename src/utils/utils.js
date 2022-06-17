/* eslint-disable */
const BASE_URL = 'http://localhost:8080';

//const BASE_URL = 'https://final-project-garden-planner.herokuapp.com';

export const API_URL = (slug) => `${BASE_URL}/${slug}`;

export const API_SINGLE = (plantId) => `${BASE_URL}/plants/plant${plantId}`;
