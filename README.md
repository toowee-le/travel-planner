# Travel Planner App :airplane:

## Description

[Udacity Front End Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011) - Capstone Project</br>

This is a web application for travel planning. The user can add a future trip by searching the city, which will bring up information about the country being visited and the current/future weather forecast.</br>

Technologies used: HTML, CSS, Sass, JavaScript, Node.js, Express, Webpack, Babel, Service Workers, Jest

### Features

- Express server set up
- Webpack set up with two config files for development and production modes
- Sass used for styling
- Service Workers set up to allow offline access
- Users can add and remove multiple trips
- Local Storage used to save the user's trip(s) so that the information is still there when the web app is revisited
- Users can add an end date with the length of trip displayed
- Requests made to [REST Countries API](https://restcountries.eu/) to pull in data about the country being visited (Country, Capital, Region, Sub-region, Languages, Currency, Timezone)
- Current and future weather forecast pulled from [Weatherbit](https://www.weatherbit.io/api)

## Demo

![Travel Planner App](demo.gif)

## Install the app locally

```javascript
// Clone the repository
git clone https://github.com/toowee-le/travel-planner.git

// Open the project folder
cd travel-planner

// In the terminal, run the following commands
npm install

// Run local webpack dev server for the development mode
npm run build-dev

// Run production mode
npm run build-prod
npm run start

// Test the app
npm run test

```

## Acknowledgement

This project uses the following APIs: [Weatherbit](https://www.weatherbit.io/api), [Geonames](http://www.geonames.org/export/web-services.html), [Pixabay](https://pixabay.com/api/docs/) and [REST Countries](https://restcountries.eu/).
