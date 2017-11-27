const request = require('request');


var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/2bfcd64ae4c2110e0ddc5ed5fe14509a/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Could not connect to DarkSky Server.')
        }else if(response.statusCode === 400) {
            callback('Unable to find that address');
        } else if(response.statusCode === 200) {
        callback(undefined, { 
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
        }
    });
}

var getWeatherPromise = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/2bfcd64ae4c2110e0ddc5ed5fe14509a/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Could not connect to DarkSky Server.')
            }else if(response.statusCode === 400) {
                reject('Unable to find that address');
            } else if(response.statusCode === 200) {
                resolve({ 
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
            }
        });
    });
}

module.exports = {
    getWeather,
    getWeatherPromise
}