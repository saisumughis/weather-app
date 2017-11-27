const request = require('request');


var getGeoCode = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        // console.log(JSON.stringify(body,undefined,2));
        if(error) {
            callback('Could not connect to Google Servers.')
        }else if(body.status === "ZERO_RESULTS") {
            callback('Unable to find that address');
        } else if(body.status === "OK") {
        callback(undefined, { 
            address: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng
        });
        }
    });
}

var getGeoCodePromise = (address) => {
    return new Promise((resolve, reject) => {

        var encodedAddress = encodeURIComponent(address);
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            // console.log(JSON.stringify(body,undefined,2));
            if(error) {
                reject('Could not connect to Google Servers.')
            }else if(body.status === "ZERO_RESULTS") {
                reject('Unable to find that address');
            } else if(body.status === "OK") {
            resolve({ 
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
            }
        });

    });

}

module.exports = {
    getGeoCode,
    getGeoCodePromise
}