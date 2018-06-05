const request = require('request');

request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=jl%20nuansa%20kori%20sading%201%20no%2019',
    json: true,
}, (err, res, body) => {
    // console.log(JSON.stringify(res, undefined, 2));
    let results = body.results[0];
    let location = results.geometry.location;

    console.log(location);
});