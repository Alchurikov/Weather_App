const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const { cityInf, cityCond } = data;

  details.innerHTML = `<h5 class="my-3">${cityInf.EnglishName}</h5>
  <div class="my-3">${cityCond.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${cityCond.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>`;

  const iconSource = `img/icons/${cityCond.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);

  let timeSource = null;
  if (cityCond.IsDayTime) {
    timeSource = "img/day.svg";
  } else {
    timeSource = "img/night.svg";
  }
  time.setAttribute("src", timeSource);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const getGenInfo = async (city) => {
  const cityInf = await getCityInfo(city);
  const cityCond = await getWeatherInfo(cityInf.Key);

  return {
    cityInf,
    cityCond,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  getGenInfo(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  getGenInfo(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
