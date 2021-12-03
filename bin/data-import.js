#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const https = require('https');
const path = require('path');
const fs   = require('fs');
const unzipper = require('unzipper');
const {chain}  = require('stream-chain');
const {parser} = require('stream-json');
const {pick}   = require('stream-json/filters/Pick');
const {streamArray} = require('stream-json/streamers/StreamArray');

const DATA_URI = 'https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_foundation_food_json_2021-10-28.zip';
const DATA_DIR = path.resolve(__dirname, '../data');
const DATA_FILE = path.basename( DATA_URI, '.zip') + '.json';

function showHelp () {
	console.log(`
	Import nutitional data from FDA website to MongoDB.

	Usage: ./data-import.js [OPTIONS] ARG
		./data-import.js --verbose arg

	Options:
	-h, --help		Show help.
	-v, --verbose		Verbose output.
	`);
	
	return process.exit(0);
}

if (argv.h || argv.help) {
	showHelp();
}


// const arg1 = argv._[0] || argv.arg1 || argv.a;
// const verbose = argv.v || argv.verbose;
	
async function downloadData (uri = DATA_URI) {

	return new Promise((resolve, reject) => {

		https.get(uri, response => {

			if (response.statusCode !== 200) {
				reject( new Error( `Server responded with ${response.statusCode}: ${response.statusMessage}`) );
			} 

			response.pipe( unzipper.Extract( { path: DATA_DIR } ) )
				.on( 'error', reject )
				.on('finish', () => {
					return resolve( path.resolve(DATA_DIR, DATA_FILE) );
				});


		}).on('error', reject);

	});

}

function parseData (file) {

	console.log(`Parsing data from ${file}`);

	return new Promise( function (resolve, reject) {

		const pipeline = chain([
			fs.createReadStream(file),
			parser(),
			pick({filter: 'FoundationFoods'}),
			// ignore({filter: /\b_meta\b/i}),
			streamArray(),
			(data) => {
				// return insertData(data.value);
				console.log(data);
			}
		]);

		let counter = 0;
		pipeline.on('data', () => ++counter);
		pipeline.on('end', () => {
			console.log(`Done parsing ${counter} nutirional facts from the USDA.`);
			resolve('done');
		});

	});

}

function insertData (data) {
	console.log('\n\n ———————— INSERTING DATA ————————\n\n');
	console.log(data);
}

( async () => {
	
	let dataFile,
		data;
	
	try {
		dataFile = await downloadData();
	} catch (err) {
		return Promise.reject(err);
	}

	try {
		data = await parseData(dataFile);
	} catch (err) {
		return Promise.reject(err);
	}
	
	return data;
	

})()
	.then( (result) => {
		console.log(result);
		process.exit(0);
	})
	.catch( (e) => {
		console.error(e);
		process.exit(1);
	});