import { geonamesAPI, weatherbitAPI, pixabayAPI, restCountriesAPI } from './api'

/**
 * Global Variables
 */

let newTrip = {};
let tripList = document.querySelector('.trip-list');
let modal = document.querySelector('.modal');

/**
 * End Global Variables
 * Begin Main Functions
 */

export const handleSubmit = async (event) => {
    event.preventDefault();

    // DOM elements needed
    const form = document.forms['travel-form']['to'].value;
    if (form !== '') {
        modal.classList.add('active');
        const destination = document.getElementById('to').value;

        await geonamesAPI(destination)
        .then(geoData => {
            newTrip.city = geoData.geonames[0].name;
            newTrip.country = geoData.geonames[0].countryName;
            newTrip.lat = geoData.geonames[0].lat;
            newTrip.lon = geoData.geonames[0].lng;
        })

        await restCountriesAPI(newTrip.country)
        .then(countryInfo => {
            newTrip.region = countryInfo[0].region;
            newTrip.subRegion = countryInfo[0].subregion;
            newTrip.languages = countryInfo[0].languages[0].name;
            newTrip.currency = countryInfo[0].currencies[0].code;
            newTrip.timezone = countryInfo[0].timezones[1];
        })

        await weatherbitAPI(newTrip.lat, newTrip.lon)
        .then(weatherData => {
            newTrip.currentMinTemp = Math.floor(weatherData.data[0].min_temp);
            newTrip.currentMaxTemp = Math.floor(weatherData.data[0].max_temp);
            newTrip.currentTemp = weatherData.data[0].temp;
            newTrip.description = weatherData.data[0].weather.description;
            newTrip.icon = weatherData.data[0].weather.icon;
        })

        await pixabayAPI(newTrip.city, newTrip.country)
        .then(photo => {
            newTrip.photo = photo.hits[0].webformatURL;
        })

        console.log(newTrip);

        createNewTrip(newTrip);
    } else {
        alert("Please enter a destination");
    }
}

// POST request to the server
export const postRequest = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const getData = await res.json();
        return getData;
    } catch(err) {
        console.log("Error:", err);
    }
}

// Add new trip entry
const createNewTrip = (data) => { 
    let innerHTML = `
        <div class="trip-content">
            <div class="trip-selected">
                <h2 class="trip-city">${data.city}, ${data.country}</h2>
                <img class="trip-photo" src="${data.photo}" alt="City Photo">
                <div class="trip-info">
                    <p>Country: <span class="data">${data.country}</span></p>
                    <p>Region: <span class="data">${data.region}</span></p>
                    <p>Sub-region: <span class="data">${data.subRegion}</span></p>
                    <p>Languages: <span class="data">${data.languages}</span></p>
                    <p>Currency: <span class="data">${data.currency}</span></p>
                    <p>Timezone: <span class="data">${data.timezone}</span></p>
                </div>
            </div>
            
            <div class="weather-info">
                <h3 class="destination">My trip to: <span  class="highlight">${data.city}, ${data.country}</span></h3>
                <h3 class="departing">Departing: <span class="highlight">14/08/2020</span></h3>
                <p class="countdown">Your trip to ${data.city} is <strong>10</strong> days away and you will return to London on 22/08/2020.</p>
                <div class="btn-group">
                    <button class="btn save-trip">Save trip</button>
                    <button class="btn delete-trip">Delete trip</button>
                </div>
                <hr>
                <p>Weather forecast:</p>
                <div class="weather-forecast">
                    <div class="weather-current">
                        <p class="weather-date">Current weather:
                            <br>02/08/2020
                        </p>
                        <img class="weather-icon" src="public/${data.icon}.png" alt="Weather Icon">
                        <p class="weather-description">${data.description}</p>
                        <p class="weather-temp">Low: ${data.currentMinTemp}&#8451; <span class="divider">|</span> High: ${data.currentMaxTemp}&#8451;</p>
                    </div>
                    <div class="weather-future">
                        <p class="weather-date">Future forecast:<br>14/08/2020</p>
                        <img class="weather-icon" src="assets/${data.icon}.png" alt="Weather Icon">
                        <p class="weather-description">Broken Clouds</p>
                        <p class="weather-temp">Low: 22&#8451; <span class="divider">|</span> High: 25&#8451;</p>
                    </div>
                </div>
            </div>
        </div>
    `

    modal.innerHTML = innerHTML;
}