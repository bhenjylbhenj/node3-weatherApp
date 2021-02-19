const request = require('request');

const mapBox = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhlbmp5bGJoZW5qIiwiYSI6ImNrbDRxNml1OTAycGIyd3JybHFweWd0MXkifQ.FoZXqxZLv8t_SPr2BUuJCQ&limit=1';
        request({url: url, json: true}, (error, response) => {
            // console.log(response.body);
            if(error) {
                console.log('Mapbox service is unavailable');
                callback({error: '401', message: 'Mapbox service is unavailable'}, undefined);
            } else if (response.body.features[0] == undefined) {
                // console.log(response.body.message);
                callback({error: '402', message: 'Unable to find the location. Try another search'}
                , 
                // origMsg: response.body.message}, 
                undefined);
            } else {
                const result = response.body;
                const long =  result.features[0].center[0];
                const lat =  result.features[0].center[1];
                const place = result.features[0].place_name;
                // console.log(result.features[0].center);
                callback(undefined, {long, lat, place});
                debugger;
            }

        debugger;
    });
}

module.exports = {
    geocode: mapBox
};
