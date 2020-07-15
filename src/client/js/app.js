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
            postRequest('/location', {lat: data.lat, lon: data.lon, country: data.country, city: destination})
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

// Get the city coordinates
export const geonamesAPI = async (city = '') => {
    const username = '&username=toowee_';
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1${username}`;
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const res = await fetch(proxy+url);
    try {
        const data = await res.json();
        const lat = data.geonames[0].lat;
        const lon = data.geonames[0].lng;
        const country = data.geonames[0].countryName;
        return {
            lat,
            lon,
            country
        };
    } catch(error) {
        console.log("Error:", error);
    }
}