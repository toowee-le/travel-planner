/**
 * @description - Functions to get API data from Geonames, Rest Countries, Weatherbit and Pixabay 
 */

// To avoid the CORS issue, run APIs through a proxy
const proxy = 'https://cors-anywhere.herokuapp.com/';

// Get the city
export const geonamesAPI = async (city = '') => {
    const username = '&username=toowee_';
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1${username}`;
    const res = await fetch(proxy+url);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("Error:", error);
    }
}

// Get more info on the country from Rest Countries API
export const restCountriesAPI = async (country) => {
    const url = `https://restcountries.eu/rest/v2/name/${country}`;
    const res = await fetch(url);
    try {
        const data = res.json()
        return data;
    } catch (error) {
        console.log("Error:", error);
    }
}

// Get weather data from Weatherbit API
export const weatherbitAPI = async (lat, lon) => {
    const api_key = '2f1b002cd6df484a912343ac141d2074';
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${api_key}`;
    const res = await fetch(proxy+url);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("Error:", error);
    }
}

// Get an image of city from Pixabay API
export const pixabayAPI = async (city, country) => {
    const api_key = '12461459-f96eefb4a24ca6fc33004224d';
    const url = `https://pixabay.com/api/?key=${api_key}&q=${city}+${country}&image_type=photo`;
    const res = await fetch(proxy+url);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("Error:", error);
    }
}