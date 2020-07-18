import { geonamesAPI, weatherbitAPI, pixabayAPI, restCountriesAPI } from './api'

export const handleSubmit = async (event) => {
    event.preventDefault();

    let newTrip = {};

    // DOM elements needed
    const form = document.forms['travel-form']['to'].value;
    if (form !== '') {

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
            newTrip.currency = countryInfo[0].currencies[0].code;
            newTrip.timezone = countryInfo[0].timezones[1];
        })

        await weatherbitAPI(newTrip.lat, newTrip.lon)
        .then(weatherData => {
            newTrip.currentMinTemp = weatherData.data[0].min_temp;
            newTrip.currentMaxTemp = weatherData.data[0].max_temp;
            newTrip.currentTemp = weatherData.data[0].temp;
            newTrip.description = weatherData.data[0].weather.description;
            newTrip.icon = weatherData.data[0].weather.icon;
        })

        await pixabayAPI(newTrip.city, newTrip.country)
        .then(photo => {
            newTrip.photo = photo.hits[0].webformatURL;
            console.log(newTrip)
        })
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

// Update UI
const updateUI = () => {
    const header = document.getElementsByTagName('header');

    window.onscroll = () => {
        let top = window.scrollY;
        // if (top >= 100) {
        //     header.classList.add('active')
        // } else {
        //     header.classList.remove('active')
        // }
        console.log(header);
    }
}

updateUI();