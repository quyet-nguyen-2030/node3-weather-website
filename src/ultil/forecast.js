const request = require('request');

const foreCast = (lat, lng, cb) => {
    const secretKey = '66584b230e263d4de946529961135348';
    const inputLocation = [ lat, lng ];
    const date = new Date(); const readableDate = date.toUTCString();    
    const unit = { degreeF: 'us', degreeC: 'si' };
    const lang = { default: 'en', Czech: 'cs', Japan: 'ja' };
    // const url = 'https://api.darksky.net/forecast/66584b230e263d4de946529961135348/'+lat + ',' +lng+'?si';
    const url = `https://api.darksky.net/forecast/${secretKey}/${
        //encodeURIComponent(inputLocation)}?${readableDate}&${ Using this encodeURIComponent also work!
        inputLocation.toString()}?&${unit.degreeC}&lang=${lang.default}`;
            
    // De-structuring res object -> request({ url, json: true}, (err, res) => {
    // console.log(url);    
    request({ url, json: true}, (err, {body}) => { // Applying de-structuring  
        if (err) {cb('Unable to connect to server', undefined);}
        else if (body.error) { cb('unable to find location', body.error ); }
        else {
            // console.log(body.daily.data[0]);
            cb (undefined, `${
                body.daily.data[0].summary} It is currently ${
                body.currently.temperature} degreesC out. The high temp. today is ${
                body.daily.data[0].temperatureHigh}, with a low temp. of ${
                body.daily.data[0].temperatureLow}. There\'s is a ${
                body.currently.precipProbability} % chance of rain` )}
    }); }
module.exports = foreCast;
