const request = require('request');
const yargs = require('yargs');
const _ = require('lodash');
const fs = require('fs');


const argv = yargs
	.command('search', 'This is an address', {
		address: {
	    describe: 'A street and number address.',
		demand: true,
		alias: 'a'
		},
		city: {
	    describe: 'The city.',
		demand: true,
		alias: 'c'
		},
		country: {
			describe: 'The country',
			demand: true,
			alias: 'l'
		}
	})
	.help()
	.argv;

let address = argv.address;
let city = argv.city;
let country = argv.country;

console.log(`The address is ${address}. ${city} in ${country}`);

let fullAddressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ' ' + city + ' ' + country + '&key=AIzaSyBifkRm7ZOQHWQ6FovS55iS1LNqlUACte4';
console.log(fullAddressUrl);

let lattitude = '';
let longitude = '';

request({
	url: fullAddressUrl,
	json: true
}, (error, response, body) => {
	if(body.error_message) {
		console.log("Whoops! Looks like the API is not working...")
	}
	else {
	console.log(JSON.stringify(body, undefined, 2));
	let parsedBody = JSON.parse(body);
	lattitude = parsedBody.results[0].geometry.location.lat;
	longitude = parsedBody.results[0].geometry.location.lng;
}
});



setTimeout(() => {
	console.log("The data you are looking for is the following:");
	console.log(`Lattitude: ${lattitude}`);
	console.log(`Longitude: ${longitude}`);
	}, 4000);