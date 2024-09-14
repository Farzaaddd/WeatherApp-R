import axios from "axios";

const API = "https://api.openweathermap.org";
const API_KEY = "a8961232a18d1f1e90ff880305722817";

// search cities
const GetSearch = (search) =>
  axios.get(`${API}/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`);

// get weather by lat and lon
const getWeather = (location) =>
  axios.get(
    `${API}/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
  );

// get weather by lat and lon when page is reLoaded
const getReload = (query) =>
  axios.get(`${API}/data/2.5/weather?${query}&units=metric&appid=${API_KEY}`);

// getting user's weather
const currentLoc = ({ latitude, longitude }) =>
  axios.get(
    `${API}/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );

// Dubai climate
const DubaiClimate = () =>
  axios.get(`${API}/data/2.5/weather?q=dubai&units=metric&appid=${API_KEY}`);

// NY climate
const newYorkClimate = () =>
  axios.get(
    `${API}/data/2.5/weather?q=New%20York&units=metric&appid=${API_KEY}`
  );

// Air population by searching a location
const Pollution = (location) =>
  axios.get(
    `${API}/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
  );

// Air population by reloading and hash page
const airPollution = ({ query }) =>
  axios.get(`${API}/data/2.5/air_pollution?${query}&appid=${API_KEY}`);

// Air population by reloading and hash page in Paths.jsx
const airPollutionR = (current) =>
  axios.get(`${API}/data/2.5/air_pollution?${current}&appid=${API_KEY}`);

// Air population by current loc hash page
const currentPollution = ({ latitude, longitude }) =>
  axios.get(
    `${API}/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  );

export {
  API,
  API_KEY,
  GetSearch,
  getWeather,
  getReload,
  currentLoc,
  DubaiClimate,
  newYorkClimate,
  Pollution,
  airPollution,
  airPollutionR,
  currentPollution,
};
