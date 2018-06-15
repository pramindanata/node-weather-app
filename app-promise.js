const yargs = require('yargs');
const axios = require('axios');

let argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true,
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
let encodedAddr = encodeURIComponent(argv.address);
let weather = {
    endpoint: "https://api.darksky.net/forecast",
    key: "5b2f9dd03afd05a8bc366fed4bfffa5c",
}

axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddr}`).then((res) => {
    let data = res.data;
    let result = data.results[0];
    let location;

    if (data.status === "ZERO_RESULTS") 
        throw new Error("Address not found.");
    
    location = {
        formatted_address: result.formatted_address,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng
    };
    
    console.log(location.formatted_address);
    
    return axios.get(`${weather.endpoint}/${weather.key}/${location.lat},${location.lng}`);
}).then(res => {
    let data = res.data;
    let temp = {
        actual: data.currently.temperature,
        apparently: data.currently.apparentTemperature
    };

    console.log(`It's currently ${temp.actual}. It feels like ${temp.apparently}.`);
}).catch((err) => {
    if (err.code === "ENOTFOUND")
        console.log("Unable to connect to google server.");
    else
        console.log(err.message);
});