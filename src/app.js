const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

// Using Callbacks
geocode.getGeoCode(argv.address, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    }else {
        // console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather( results.lat, results.lng, (errorMessage, weatherResults) => {
            if(errorMessage) {
                console.log(errorMessage);
            }else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
    });
}
});

// Using Promises
geocode.getGeoCodePromise(argv.address).then((results)=>{
    return weather.getWeatherPromise(results.lat, results.lng);
}, (errorMessage) => {
    console.log(errorMessage);
}).then((weatherResults) => {
    console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
   }, 
    (errorMessage) => {
    console.log(errorMessage);
});
    