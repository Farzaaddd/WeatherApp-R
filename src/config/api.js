import axios from "axios";

const API = "https://api.openweathermap.org";
const API_KEY = "e0ff8bd3aeecb0b2e7a790a8585fab7e";

const GetSearch = (search) =>
  axios.get(`${API}/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`);

export { GetSearch };
