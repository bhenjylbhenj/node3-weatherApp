const request = require('request');

const pullWeather = (long, lat, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(long)}&exclude=daily,minutely&appid=37dd527b03c77fd15c2f33316f4e5d02&units=metric`;
    // console.log(url);
    request({url: url, json: true}, (error, response) => {
    if (error) {
        callback({
            cod: '401',
            message: 'OpenWeather API services is not available'
        }, undefined);
    } else if (response.body.cod) {
        callback({
            cod: '402',
            message: 'Cannot pull up location'
        }, undefined);
    } else {
        const result = response.body;
        const temp = result.current.temp;
        const main = result.current.weather[0].main;
        const description = result.current.weather[0].description;
        const perc = result.hourly[0].pop;

        callback(undefined, {
            temp, main, description, perc
        });
    }
});
}



module.exports = {
    forecast: pullWeather
}