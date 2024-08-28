import axios from "axios";

const API = "https://api.openweathermap.org";
const API_KEY = "e0ff8bd3aeecb0b2e7a790a8585fab7e";

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

export {
  GetSearch,
  getWeather,
  getReload,
  currentLoc,
  DubaiClimate,
  newYorkClimate,
};
