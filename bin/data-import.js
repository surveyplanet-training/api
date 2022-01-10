#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const https = require('https');
const path = require('path');
// const { inspect } = require('util');
const fs = require('fs');
const unzipper = require('unzipper');
const { chain } = require('stream-chain');
const { parser } = require('stream-json');
const { pick } = require('stream-json/filters/Pick');
const { streamArray } = require('stream-json/streamers/StreamArray');
const { mongoUri } = require('../lib/definitions');
const mongoose = require('mongoose');
const parseSurveyFoods = require('../lib/parseSurveyFoods');
const Ingredient = require('../lib/models/ingredient.js');

//const DATA_URI = 'https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_foundation_food_json_2021-10-28.zip'; // Foundational Food Data - 4.3 MB
//const ROOT_KEY = 'FoundationFoods';

//const DATA_URI = 'https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_branded_food_json_2021-10-28.zip'; // Global Branded Foods - 2.6 GB
//const ROOT_KEY = 'BrandedFoods';

//const DATA_URI = 'https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_json_2021-10-28.zip'; // SR Legacy - 205 MB
//const ROOT_KEY = 'SRLegacyFoods';

const DATA_URI =
	'https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_survey_food_json_2021-10-28.zip'; // Food and Nutrient Database for Dietary Studies (FNDDS) - 84.3 MB
const ROOT_KEY = 'SurveyFoods';

const DATA_DIR = path.resolve(__dirname, '../data');
const DATA_FILE = path.basename(DATA_URI, '.zip') + '.json';

function showHelp() {
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
const verbose = argv.v || argv.verbose;

let counter = 0;

// Download data from USDA and save file to DATA_DIR
async function downloadData(uri = DATA_URI) {
	// if (fs.existsSync)
	// if file.exists stream from file
	// if !file.exists download
	return new Promise((resolve, reject) => {
		https
			.get(uri, (response) => {
				if (response.statusCode !== 200) {
					reject(
						new Error(
							`Server responded with ${response.statusCode}: ${response.statusMessage}`
						)
					);
				}

				response
					.pipe(unzipper.Extract({ path: DATA_DIR }))
					.on('error', reject)
					.on('finish', () => {
						return resolve(path.resolve(DATA_DIR, DATA_FILE));
					});
			})
			.on('error', reject);
	});
}

// Open JSON file and parse items
function parseData(file) {
	console.log(`Parsing data from ${file}`);



	return new Promise(function (resolve, reject) {
		const pipeline = chain([
			fs.createReadStream(file),
			parser(),
			pick({ filter: ROOT_KEY }),
			streamArray(),
			(data) => {
				return insertDocument(data.value);
			},
		]);

		pipeline.on('data', () => counter++);
		pipeline.on('end', () => {
			if (verbose) {
				console.log(`Done parsing ${counter} nutirional facts from the USDA.`);
			}
			resolve(counter);
		});
	});
}

async function insertDocument(data) {
	// console.log('\n\n ———————— INSERTING DATA ————————\n\n');
	// console.log(inspect(data, { depth: 3, colors: true }));
	// 2. TODO: Insert data into 'foods' collections

	counter++;

	let parsedData = parseSurveyFoods(data);

	if (verbose) {
		console.log(`${counter} - Inserting: ${parsedData.code}`);
	}

	return await Ingredient.findOneAndUpdate(
		{ code: parsedData.code }, 
		parsedData, 
		{
			new: true,
			upsert: true // Make this update into an upsert
		}
	);

}

// parseFoundationFoods () {}
// parseBrandedFoods () {}
// parseSRLegacyFoods () {}

// Initialize
(async () => {
	let dataFile, data;

	// 1. TODO: Connect to MongoDB  'mongoose.connect(mongoUri) );
	if (verbose) {
		console.time('import');
	}

	mongoose.connect(mongoUri);

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

	if (verbose) {
		console.timeEnd('import');
	}

	return data;

})()
	.then((result) => {
		console.log('Success!');
		// 5a. TODO: Close MongoDB connection
		process.exit(0);
	})
	.catch((e) => {
		console.error(e);
		// 5b. TODO: Close MongoDB connection
		process.exit(1);
	});
