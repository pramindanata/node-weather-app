const request = require('request');

let self = module.exports = {
    methods: {
        geocodeAddress(address, callback) {
            let encodedAddr = encodeURIComponent(address);

            request({
                url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`,
                json: true,
            }, (err, res, body) => {
                if (err) {
                    callback(`Unable to connect to google server.`);
                } else if (body.status === 'ZERO_RESULTS') {
                    callback(`Address not found.`);
                } else if (body.status === 'OK') {
                    let results = body.results[0];
                    let location = results.geometry.location;

                    callback(undefined, {
                        formatted_address: results.formatted_address,
                        lat: location.lat,
                        lng: location.lng
                    })
                }
            });
        }
    }
};