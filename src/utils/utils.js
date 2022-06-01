const BASE_URL = 'http://localhost:8080';

export const API_URL = (slug) => `${BASE_URL}/${slug}`;

export const API_SINGLE = (plantId) => `${BASE_URL}/plants/plant${plantId}`;
