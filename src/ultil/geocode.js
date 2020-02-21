const request = require('request');

const geoCode = (address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)
     + '.json?access_token=pk.eyJ1IjoicXV5ZXQyMDMwIiwiYSI6ImNrNjVibG45azBxY20zZXFvMjBjZDhnMmcifQ.L'
     +'96bKRj3oTEncOrGZs9hjA&limit=1';
    request({ url, json: true }, (err, {body}) => {
        // console.log(body);
        if (err) { cb('Unable to connect to location server', undefined) }
        else if (body.message) { cb(`Something very wrong: ${body.message}`, undefined); }
        else if (body.features.length == 0) { cb('No match found, try another search', undefined) }
        else {
            cb(undefined, { // An object of data will be returned by this cb function
                lattitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name }) }
    });}
module.exports = geoCode;

