import {
  geonamesAPI,
  weatherbitAPI,
  pixabayAPI,
  restCountriesAPI,
} from "./api";
import { createNewTrip } from "./new_trip";
import { getDaysLeft } from "./helpers";

/**
 * Global Variables
 */

// Empty object to save API data
let newTrip = {};
// Empty array to store new trips
let tripsArray = [];

let tripList = document.querySelector(".trip");
let modal = document.querySelector(".modal");
let travelForm = document.getElementById("travelForm");

let departDate = document.getElementById("departDate");
let returnDate = document.getElementById("returnDate");

/**
 * @description - handle the main function for creating a new trip entry after submitting the form
 */

export const handleSubmit = async (event) => {
  event.preventDefault();

  const form = document.forms["travel-form"]["to"].value;
  if (form !== "") {
    openModal();
    const destination = document.getElementById("to").value;

    await geonamesAPI(destination).then((geoData) => {
      newTrip.city = geoData.geonames[0].name;
      newTrip.country = geoData.geonames[0].countryName;
      newTrip.lat = geoData.geonames[0].lat;
      newTrip.lon = geoData.geonames[0].lng;
    });

    await restCountriesAPI(newTrip.country).then((countryInfo) => {
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
    });

    await pixabayAPI(newTrip.city, newTrip.country).then((photo) => {
      newTrip.photo = photo.hits[0].webformatURL;
    });

    newTrip.departing = departDate.value
      .split("-")
      .reverse()
      .join("-")
      .replace(/-/g, "/");
    newTrip.returning = returnDate.value
      .split("-")
      .reverse()
      .join("-")
      .replace(/-/g, "/");
    newTrip.countdown = getDaysLeft(Date.now(), departDate.value);
    newTrip.id = Date.now();

    // Get today's date for current weather forecast
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;
    newTrip.dateToday = today;

    // Pass API data through to HTML template for adding a new trip entry to the UI
    createNewTrip(modal, newTrip, "modal");
  } else {
    alert("Please enter a destination");
  }
};

/**
 * @description - handle the new trip entry
 * @param {Node} entry - element for new trip entry
 * @param {object} data - new trip data
 * @param {string} entryType - determine where the trip entry will be added on the UI (modal/trip list)
 * @param {string} id - unique ID value of new element
 */

export const handleResult = async (entry, data, entryType, id) => {
  let save = document.getElementById(`saveTrip_${id}`);
  let deleteBtn = document.getElementById(`deleteTrip_${id}`);

  if (entryType === "modal") {
    deleteBtn.addEventListener("click", () => {
      tripList.innerHTML = "";
      travelForm.reset();
      closeModal();
    });

    save.addEventListener("click", () => {
      // Clone the current trip object and push the new data to the global array variable
      let obj = { ...data };
      tripsArray.push(obj);

      // Add new trip to local storage
      localStorage.setItem("trip", JSON.stringify(tripsArray));

      // Hide the save button when new trip is added to the list
      save.style.display = "none";
      tripList.prepend(entry);
      travelForm.reset();
      closeModal();
    });
  }
};

/**
 * @description - functions for handling event listeners
 */

const openModal = () => {
  modal.classList.add("active");
  document.body.style.overflowY = "hidden";
};

const closeModal = () => {
  modal.classList.remove("active");
  document.body.style.overflowY = "auto";
};

window.onload = () => JSON.parse(localStorage.getItem("savedTrips"));
