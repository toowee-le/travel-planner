import { geonamesAPI } from './api'

export function handleSubmit(event) {
    event.preventDefault();

    // DOM elements needed
    const form = document.forms['travel-form']['to'].value;

    if (form == '') {
        alert("Please enter a destination");
        return false;
    } else {
        const destination = document.getElementById('to').value;
        geonamesAPI(destination)
        .then(data => {
            console.log(data)
            postRequest('/destination', {lat: data.lat, lon: data.lon, country: data.country, city: destination})
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
        const data = await res.json();
        return data;
    } catch(err) {
        console.log("Error:", err);
    }
}