import axios from "axios";

const API_KEY = "4b298c9560ba4f4e9ad152524230504";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const DAYS = 8;

//  --get the data from the API using axios.
//The parameter for this function is the input value(city name entered) / city name of current location(at first render)

const getData = (inputValue) => {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: inputValue,
        days: DAYS,
      },
    })
    .then((response) => response.data);
};
export default getData;
