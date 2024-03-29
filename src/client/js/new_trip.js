import { handleResult } from "./app";

/**
 * @description - HTML template for adding a new trip
 * @param {Node} entry - New element for new trip
 * @param {object} data - Data fetched from API for new trip
 * @param {string} ui - Declare where the new trip entry is added on the UI (modal or trip list)
 */

export const createNewTrip = (entry, data, ui) => {
  let element = document.createElement("div");
  element.classList.add("trip-content");

  let dayAmount = `${data.countdown > 1 ? "days" : "day"}`;

  let innerHTML = `
        <div class="trip-selected">
            <h2 class="trip-city">${data.city}, ${data.country}</h2>
            <img class="trip-photo" src="${data.photo}" alt="City Photo">
            <div class="trip-info">
                <p>Country: <span class="data">${data.country}</span></p>
                <p>Capital: <span class="data">${data.capital}</span></p>
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
            <p class="countdown">${data.city}, ${data.country} is <strong>${data.countdown}</strong> ${dayAmount} away.</p>
            <p>Length of trip: <strong>${data.length}</strong> days.</p>
            <div class="btn-group">
                <button class="btn save-trip" id="saveTrip_${data.id}">Save trip</button>
                <button class="btn delete-trip" id="deleteTrip_${data.id}">Delete trip</button>
            </div>
            <hr>
            <p>Weather forecast:</p>
            <div class="weather-forecast">
                <div class="weather-current">
                    <p class="weather-date">Today's forecast:
                        <br>${data.currentDate}
                    </p>
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.icon}.png" alt="Weather Icon">
                    <p class="weather-description">${data.description}</p>
                    <p class="weather-temp">Lo: ${data.currentMinTemp}&#8451; <span class="divider">|</span> Hi: ${data.currentMaxTemp}&#8451;</p>
                </div>
                <div class="weather-future">
                    <p class="weather-date">Future forecast:
                        <br>${data.departing}
                    </p>
                    <img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.futureIcon}.png" alt="Weather Icon">
                    <p class="weather-description">${data.futureDescription}</p>
                    <p class="weather-temp">Lo: ${data.futureMinTemp}&#8451; <span class="divider">|</span> Hi: ${data.futureMaxTemp}&#8451;</p>
                </div>
            </div>
        </div>
    `;

  element.innerHTML = innerHTML;

  ui === "modal" ? entry.append(element) : entry.prepend(element);

  handleResult(element, data, ui, data.id);
};
