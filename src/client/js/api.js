// Get the city
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