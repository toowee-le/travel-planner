import { geonamesAPI, weatherbitAPI } from './api'

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
            console.log(geoData)
        });

        await weatherbitAPI(newTrip.lat, newTrip.lon)
        .then(weatherData => {
            newTrip.currentMinTemp = weatherData.data[0].min_temp;
            newTrip.currentMaxTemp = weatherData.data[0].max_temp;
            newTrip.currentTemp = weatherData.data[0].temp;
            newTrip.description = weatherData.data[0].weather.description;
            newTrip.icon = weatherData.data[0].weather.icon;
            console.log(weatherData)
        })
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