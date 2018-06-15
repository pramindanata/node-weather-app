const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.methods.geocodeAddress(argv.address, (errMessage, result) => {
    if (errMessage) {
        console.log(errMessage);
    } else {
        // console.log(JSON.stringify(result, undefined, 2));
        weather.methods.fetch({
            lat: result.lat,
            lng: result.lng
        }, (temp) => {
            console.log(result.formatted_address);
            console.log(`It's currently ${temp.temp}. It feels like ${temp.apparentTemp}.`);
        });
    }
});