const request = require('request');

let self = module.exports = {
    data: {
        api: {
            endpoint: 'https://api.darksky.net/forecast',
            key: '5b2f9dd03afd05a8bc366fed4bfffa5c',
        }
    },
    methods: {
        fetch(location = {lat, lng}, callback) {
            request({
                method: 'GET',
                url: self.data.api.endpoint + `/${self.data.api.key}/${location.lat},${location.lng}`,
                json: true,
            }, (err, res, body) => {
                if (!err && res.statusCode === 200)
                    callback({
                        temp: body.currently.temperature,
                        apparentTemp: body.currently.apparentTemperature
                    });
                else
                    callback('Unable to fetch weather.');
            });
        }
    }
};