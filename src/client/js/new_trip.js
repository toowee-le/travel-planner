import { handleResult } from "./app";

/**
 * @description - HTML template for adding a new trip
 * @param {Node} entry - display new trip entry
 * @param {Node} savedTrip - add new trip entry to the entries list
 * @param {object} data - contains all the data from the API about the new trip
 * @param {string} entryType - determine where the entry will be added on the UI
 */

export const createNewTrip = (entry, savedTrip, data, entryType) => {
  let element = document.createElement("div");
  element.classList.add("trip-content");

  let innerHTML = `
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
            <h3 class="destination">My trip to: <span  class="highlight">${data.city}</span></h3>
            <h3 class="departing">Departing: <span class="highlight">${data.departing}</span></h3>
            <h3 class="returning">Returning: <span class="highlight">${data.returning}</span></h3>
            <p class="countdown">${data.city} is <strong>${data.countdown}</strong> days away.</p>
            <div class="btn-group">
                <button class="btn save-trip" data-id="${data.id}">Save trip</button>
                <button class="btn delete-trip" data-id="${data.id}">Delete trip</button>
            </div>
            <hr>
            <p>Weather forecast:</p>
            <div class="weather-forecast">
                <div class="weather-current">
                    <p class="weather-date">Today's forecast:
                        <br>${data.dateToday}
                    </p>
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.icon}.png" alt="Weather Icon">
                    <p class="weather-description">${data.description}</p>
                    <p class="weather-temp">Low: ${data.currentMinTemp}&#8451; <span class="divider">|</span> High: ${data.currentMaxTemp}&#8451;</p>
                </div>
                <div class="weather-future">
                    <p class="weather-date">Future forecast:<br>14/08/2020</p>
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.icon}.png" alt="Weather Icon">
                    <p class="weather-description">Broken Clouds</p>
                    <p class="weather-temp">Low: 22&#8451; <span class="divider">|</span> High: 25&#8451;</p>
                </div>
            </div>
        </div>
    `;

  element.innerHTML = innerHTML;

  entryType === "modal" ? entry.append(element) : savedTrip.prepend(element);

  handleResult(element, data, entryType, data.id);
};
