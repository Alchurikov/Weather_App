const key = "KrA7xZLkrijlApko7lvG3naAEaFFA3Eh";

// get weather information
const getWeatherInfo = async (id) => {
  const url = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(url + query);
  const data = await response.json();

  return data[0];
};

// get City information
const getCityInfo = async (city) => {
  const url = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(url + query);
  const data = await response.json();

  return data[0];
};

getCityInfo("saratov")
  .then((data) => {
    return getWeatherInfo(data.Key);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
