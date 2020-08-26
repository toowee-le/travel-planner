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

// Empty opject to store all the data for the new trip
let newTrip = {};
let trips = [];

let tripList = document.querySelector(".trip");
let modal = document.querySelector(".modal");
let travelForm = document.getElementById("travelForm");

let departDate = document.getElementById("departDate");
let returnDate = document.getElementById("returnDate");

/**
 * End Global Variables
 * Begin Main Functions
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
    newTrip.id = `${departDate.value}`;

    createNewTrip(modal, tripList, newTrip, "modal");
  } else {
    alert("Please enter a destination");
  }
};

export const handleResult = async (entry, data, entryType) => {
  let save = document.querySelector(".save-trip");
  let deleteBtn = document.querySelector(".delete-trip");

  if (entryType === "modal") {
    deleteBtn.addEventListener("click", () => {
      closeModal();
      tripList.innerHTML = "";
      travelForm.reset();
    });

    save.addEventListener("click", () => {
      trips.unshift(data);
      console.log(trips);

      closeModal();
      save.style.display = "none";
      tripList.prepend(entry);
      travelForm.reset();
    });
  }
};

// Toggle modal
const openModal = () => {
  modal.classList.add("active");
  document.body.style.overflowY = "hidden";
};

const closeModal = () => {
  modal.classList.remove("active");
  document.body.style.overflowY = "auto";
};

// POST request to the server
export const postRequest = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const getData = await res.json();
    return getData;
  } catch (err) {
    console.log("Error:", err);
  }
};
