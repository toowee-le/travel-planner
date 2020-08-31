import {
  geonamesAPI,
  weatherbitAPI,
  pixabayAPI,
  restCountriesAPI,
} from "./api";
import { createNewTrip } from "./new_trip";
import { getDaysLeft, reformatDate, formValidation } from "./helpers";

/**
 * Global variables
 */

let tripList = document.querySelector(".trip");
let modal = document.querySelector(".modal");

// Check if local storage exists
let tripsArray = localStorage.getItem("trips")
  ? JSON.parse(localStorage.getItem("trips"))
  : [];
const tripData = JSON.parse(localStorage.getItem("trips"));

/**
 * @description - Handle the main function for form submit
 */

export const handleSubmit = async (e) => {
  e.preventDefault();

  const from = document.forms["travel-form"]["from"].value;
  const to = document.forms["travel-form"]["to"].value;
  const departDate = document.getElementById("departDate").value;
  const returnDate = document.getElementById("returnDate").value;
  let newTrip = {};

  if (formValidation(from, to, departDate, returnDate)) {
    openModal();

    // Check if departure date is less or greater than 16 days away. If more than 16 days away then use the latest weather forecast (i.e. ther 16th day)
    let daysLeft = getDaysLeft(Date.now(), departDate);
    let futureWeather = daysLeft < 15 ? daysLeft : 15;

    await geonamesAPI(to).then((geoData) => {
      newTrip.city = geoData.geonames[0].name;
      newTrip.country = geoData.geonames[0].countryName;
      newTrip.lat = geoData.geonames[0].lat;
      newTrip.lon = geoData.geonames[0].lng;
    });

    await restCountriesAPI(newTrip.country).then((countryInfo) => {
      newTrip.capital = countryInfo[0].capital;
      newTrip.region = countryInfo[0].region;
      newTrip.subRegion = countryInfo[0].subregion;
      newTrip.languages = countryInfo[0].languages[0].name;
      newTrip.currency = countryInfo[0].currencies[0].code;
      newTrip.timezone = countryInfo[0].timezones[0];
    });

    await weatherbitAPI(newTrip.lat, newTrip.lon).then((weatherData) => {
      newTrip.currentMinTemp = Math.floor(weatherData.data[0].min_temp);
      newTrip.currentMaxTemp = Math.floor(weatherData.data[0].max_temp);
      newTrip.currentTemp = weatherData.data[0].temp;
      newTrip.description = weatherData.data[0].weather.description;
      newTrip.icon = weatherData.data[0].weather.icon;
      newTrip.currentDate = reformatDate(weatherData.data[0].datetime);

      newTrip.futureMinTemp = Math.floor(
        weatherData.data[futureWeather].min_temp
      );
      newTrip.futureMaxTemp = Math.floor(
        weatherData.data[futureWeather].max_temp
      );
      newTrip.futureTemp = weatherData.data[futureWeather].temp;
      newTrip.futureDescription =
        weatherData.data[futureWeather].weather.description;
      newTrip.futureIcon = weatherData.data[futureWeather].weather.icon;
    });

    await pixabayAPI(newTrip.city, newTrip.country).then((photo) => {
      newTrip.photo = photo.hits[0].webformatURL;
    });

    // Additional trip data to add to the global object
    newTrip.departing = reformatDate(departDate);
    newTrip.returning = reformatDate(returnDate);
    newTrip.countdown = daysLeft;
    newTrip.length = getDaysLeft(returnDate, departDate);
    newTrip.id = Date.now();

    // Pass API data through to the HTML template to add a new trip entry to the UI
    createNewTrip(modal, newTrip, "modal");
    const loader = document.getElementById("loader");
    loader.style.display = "none";
  } else {
    alert("Missing information in form.");
  }
};

/**
 * @description - Handle the new trip entry
 * @param {Node} entry - Element for trip entry
 * @param {object} data - New trip data
 * @param {string} ui - Determine where the trip entry will be added on the UI (modal/list)
 * @param {string} id - Unique ID assigned to new element
 */

export const handleResult = async (entry, data, ui, id) => {
  let save = document.getElementById(`saveTrip_${id}`);
  let deleteBtn = document.getElementById(`deleteTrip_${id}`);
  let form = document.getElementById("travelForm");

  if (ui === "modal") {
    // Handle buttons on the modal
    save.addEventListener("click", () => {
      // Clone the current trip object and push the new data to the global array variable
      let obj = { ...data };
      tripsArray.push(obj);
      // Add new trip to local storage
      localStorage.setItem("trips", JSON.stringify(tripsArray));

      // Hide the save button when new trip is added to the list
      save.style.display = "none";
      tripList.prepend(entry);
      tripList.scrollIntoView({ behavior: "smooth" });
      form.reset();
      closeModal();
    });

    deleteBtn.addEventListener("click", () => {
      deleteEntry(entry, id);
      form.reset();
      closeModal();
    });
  } else {
    // Handle save and delete buttons on the trip list
    save.style.display = "none";

    // Delete the selected trip entry from UI and local storage
    deleteBtn.addEventListener("click", () => {
      deleteEntry(entry, id);
    });
  }
};

const deleteEntry = (entry, id) => {
  let removeTrip = tripsArray.find((trip) => trip.id === id);
  tripsArray.splice(tripsArray.indexOf(removeTrip), 1);
  entry.remove(removeTrip);
  localStorage.setItem("trips", JSON.stringify([]));
  localStorage.setItem("trips", JSON.stringify(tripsArray));
};

/**
 * @description - Event listeners
 */

const openModal = () => {
  modal.classList.add("active");
  document.body.style.overflowY = "hidden";
};

const closeModal = () => {
  modal.classList.remove("active");
  document.body.style.overflowY = "auto";
};

/**
 * @description - Load the saved trips from local storage
 */

const loadTrips = () => {
  for (let trip of tripData) {
    createNewTrip(tripList, trip, "list");
  }
};

window.onload = () => loadTrips();
