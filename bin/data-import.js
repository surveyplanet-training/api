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

// Download data from USDA and save file to DATA_DIR
async function downloadData(uri = DATA_URI) {
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

	let counter = 0;

	return new Promise(function (resolve, reject) {
		const pipeline = chain([
			fs.createReadStream(file),
			parser(),
			pick({ filter: ROOT_KEY }),
			streamArray(),
			(data) => {
				counter++;
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
	console.log('\n\n ———————— INSERTING DATA ————————\n\n');
	// console.log(inspect(data, { depth: 3, colors: true }));
	// 2. TODO: Insert data into 'foods' collections

	let parsedData = paseSurveyFoods(data);

	// 3. When human milk is complete
	// remove these two lines
	console.log(parsedData);
	process.exit(0);

	// 4. Save document in DB
	// const ingredient = new Ingredient(parsedData);
	// await ingredient.save();
}

function paseSurveyFoods(data) {
	const ingredient = {
		name: data.description,
		code: data.description.toLowerCase().replace(',', '').replace(' ', '-'), // 'Milk, Human' -> 'milk-human'
		protein: {},
		lipids: {},
		carbohydrates: {},
		energy: {},
		fibers: {},
		choline: {},
		minerals: {
			calcium: {},
			iron: {},
			magnesium: {},
			phosphorus: {},
			potassium: {},
			sodium: {},
			zinc: {},
			copper: {},
			selenium: {},
		},
		vitamins: {
			A1: {},
			A: {},
			caroteneAlpha: {},
			caroteneBeta: {},
			B1: {},
			B2: {},
			B3: {},
			B5: {},
			B6: {},
			B7: {},
			B9: {},
			B12: {},
			C: {},
			D: {},
			E: {},
			K: {},
		},
	};

	let protein = data.foodNutrients.find((item) => item.nutrient.id == 1003);

	if (protein) {
		if (protein.amount) {
			ingredient.protein.amount = protein.amount;
		}

		if (protein.nutrient && protein.nutrient.unitName) {
			ingredient.protein.unit = protein.nutrient.unitName;
		}
	}

	let carbohydrates = data.foodNutrients.find(
		(item) => item.nutrient.id == 1005
	);

	if (carbohydrates) {
		if (carbohydrates.amount) {
			ingredient.carbohydrates.amount = carbohydrates.amount;
		}

		if (carbohydrates.nutrient && carbohydrates.nutrient.unitName) {
			ingredient.carbohydrates.unit = carbohydrates.nutrient.unitName;
		}
	}

	let energy = data.foodNutrients.find((item) => item.nutrient.id == 1008);

	if (energy) {
		if (energy.amount) {
			ingredient.energy.amount = energy.amount;
		}

		if (energy.nutrient && energy.nutrient.unitName) {
			ingredient.energy.unit = energy.nutrient.unitName;
		}
	}

	let choline = data.foodNutrients.find((item) => item.nutrient.id == 1079);

	if (choline) {
		if (choline.amount) {
			ingredient.choline.amount = choline.amount;
		}

		if (choline.nutrient && choline.nutrient.unitName) {
			ingredient.choline.unit = choline.nutrient.unitName;
		}
	}

	let choline = data.foodNutrients.find((item) => item.nutrient.id == 1180);

	if (choline) {
		if (choline.amount) {
			ingredient.choline.amount = choline.amount;
		}

		if (choline.nutrient && choline.nutrient.unitName) {
			ingredient.choline.unit = choline.nutrient.unitName;
		}
	}

	let calcium = data.foodNutrients.find((item) => item.nutrient.id == 1087);

	if (calcium) {
		if (calcium.amount) {
			ingredient.minerals.calcium.amount = calcium.amount;
		}

		if (calcium.nutrient && calcium.nutrient.unitName) {
			ingredient.minerals.calcium.unit = calcium.nutrient.unitName;
		}
	}

	let iron = data.foodNutrients.find((item) => item.nutrient.id == 1089);

	if (iron) {
		if (iron.amount) {
			ingredient.minerals.iron.amount = iron.amount;
		}

		if (iron.nutrient && iron.nutrient.unitName) {
			ingredient.minerals.iron.unit = iron.nutrient.unitName;
		}
	}

	let magnesium = data.foodNutrients.find((item) => item.nutrient.id == 1090);

	if (magnesium) {
		if (magnesium.amount) {
			ingredient.minerals.magnesium.amount = magnesium.amount;
		}

		if (magnesium.nutrient && magnesium.nutrient.unitName) {
			ingredient.minerals.magnesium.unit = magnesium.nutrient.unitName;
		}
	}

	let phosphorus = data.foodNutrients.find((item) => item.nutrient.id == 1091);

	if (phosphorus) {
		if (phosphorus.amount) {
			ingredient.minerals.phosphorus.amount = phosphorus.amount;
		}

		if (phosphorus.nutrient && phosphorus.nutrient.unitName) {
			ingredient.minerals.phosphorus.unit = phosphorus.nutrient.unitName;
		}
	}

	let potassium = data.foodNutrients.find((item) => item.nutrient.id == 1092);

	if (potassium) {
		if (potassium.amount) {
			ingredient.minerals.potassium.amount = potassium.amount;
		}

		if (potassium.nutrient && potassium.nutrient.unitName) {
			ingredient.minerals.potassium.unit = potassium.nutrient.unitName;
		}
	}

	let sodium = data.foodNutrients.find((item) => item.nutrient.id == 1093);

	if (sodium) {
		if (sodium.amount) {
			ingredient.minerals.sodium.amount = sodium.amount;
		}

		if (sodium.nutrient && sodium.nutrient.unitName) {
			ingredient.minerals.sodium.unit = sodium.nutrient.unitName;
		}
	}

	let zinc = data.foodNutrients.find((item) => item.nutrient.id == 1095);

	if (zinc) {
		if (zinc.amount) {
			ingredient.minerals.zinc.amount = zinc.amount;
		}

		if (zinc.nutrient && zinc.nutrient.unitName) {
			ingredient.minerals.zinc.unit = zinc.nutrient.unitName;
		}
	}

	let copper = data.foodNutrients.find((item) => item.nutrient.id == 1098);

	if (copper) {
		if (copper.amount) {
			ingredient.minerals.copper.amount = copper.amount;
		}

		if (copper.nutrient && copper.nutrient.unitName) {
			ingredient.minerals.copper.unit = copper.nutrient.unitName;
		}
	}

	let selenium = data.foodNutrients.find((item) => item.nutrient.id == 1103);

	if (selenium) {
		if (selenium.amount) {
			ingredient.minerals.selenium.amount = selenium.amount;
		}

		if (selenium.nutrient && selenium.nutrient.unitName) {
			ingredient.minerals.selenium.unit = selenium.nutrient.unitName;
		}
	}

	let A1 = data.foodNutrients.find((item) => item.nutrient.id == 1105);

	if (A1) {
		if (A1.amount) {
			ingredient.vitamins.A1.amount = A1.amount;
		}

		if (A1.nutrient && A1.nutrient.unitName) {
			ingredient.vitamins.A1.unit = A1.nutrient.unitName;
		}
	}

	let A = data.foodNutrients.find((item) => item.nutrient.id == 1106);

	if (A) {
		if (A.amount) {
			ingredient.vitamins.A.amount = A.amount;
		}

		if (A.nutrient && A.nutrient.unitName) {
			ingredient.vitamins.A.unit = A.nutrient.unitName;
		}
	}

	let caroteneAlpha = data.foodNutrients.find(
		(item) => item.nutrient.id == 1108
	);

	if (caroteneAlpha) {
		if (caroteneAlpha.amount) {
			ingredient.vitamins.caroteneAlpha.amount = caroteneAlpha.amount;
		}

		if (caroteneAlpha.nutrient && caroteneAlpha.nutrient.unitName) {
			ingredient.vitamins.caroteneAlpha.unit = caroteneAlpha.nutrient.unitName;
		}
	}

	let caroteneBeta = data.foodNutrients.find(
		(item) => item.nutrient.id == 1107
	);

	if (caroteneBeta) {
		if (caroteneBeta.amount) {
			ingredient.vitamins.caroteneBeta.amount = caroteneBeta.amount;
		}

		if (caroteneBeta.nutrient && caroteneBeta.nutrient.unitName) {
			ingredient.vitamins.caroteneBeta.unit = caroteneBeta.nutrient.unitName;
		}
	}

	let B1 = data.foodNutrients.find((item) => item.nutrient.id == 1165);

	if (B1) {
		if (B1.amount) {
			ingredient.vitamins.B1.amount = B1.amount;
		}

		if (B1.nutrient && B1.nutrient.unitName) {
			ingredient.vitamins.B1.unit = B1.nutrient.unitName;
		}
	}

	let B2 = data.foodNutrients.find((item) => item.nutrient.id == 1166);

	if (B2) {
		if (B2.amount) {
			ingredient.vitamins.B2.amount = B2.amount;
		}

		if (B2.nutrient && B2.nutrient.unitName) {
			ingredient.vitamins.B2.unit = B2.nutrient.unitName;
		}
	}

	let B3 = data.foodNutrients.find((item) => item.nutrient.id == 1167);

	if (B3) {
		if (B3.amount) {
			ingredient.vitamins.B3.amount = B3.amount;
		}

		if (B3.nutrient && B3.nutrient.unitName) {
			ingredient.vitamins.B3.unit = B3.nutrient.unitName;
		}
	}

	let B5 = data.foodNutrients.find((item) => item.nutrient.id == 11); // FIX B5

	if (B5) {
		if (B5.amount) {
			ingredient.vitamins.B5.amount = B5.amount;
		}

		if (B5.nutrient && B5.nutrient.unitName) {
			ingredient.vitamins.B5.unit = B5.nutrient.unitName;
		}
	}

	let B6 = data.foodNutrients.find((item) => item.nutrient.id == 1175);

	if (B6) {
		if (B6.amount) {
			ingredient.vitamins.B6.amount = B6.amount;
		}

		if (B6.nutrient && B6.nutrient.unitName) {
			ingredient.vitamins.B6.unit = B6.nutrient.unitName;
		}
	}

	let B7 = data.foodNutrients.find((item) => item.nutrient.id == 11); // FIX B7

	if (B7) {
		if (B7.amount) {
			ingredient.vitamins.B7.amount = B7.amount;
		}

		if (B7.nutrient && B7.nutrient.unitName) {
			ingredient.vitamins.B7.unit = B7.nutrient.unitName;
		}
	}

	let B9 = data.foodNutrients.find((item) => item.nutrient.id == 1177);

	if (B9) {
		if (B9.amount) {
			ingredient.vitamins.B9.amount = B9.amount;
		}

		if (B9.nutrient && B9.nutrient.unitName) {
			ingredient.vitamins.B9.unit = B9.nutrient.unitName;
		}
	}

	let B12 = data.foodNutrients.find((item) => item.nutrient.id == 1178);

	if (B12) {
		if (B12.amount) {
			ingredient.vitamins.B12.amount = B12.amount;
		}

		if (B12.nutrient && B12.nutrient.unitName) {
			ingredient.vitamins.B12.unit = B12.nutrient.unitName;
		}
	}

	let C = data.foodNutrients.find((item) => item.nutrient.id == 1162);

	if (C) {
		if (C.amount) {
			ingredient.vitamins.C.amount = C.amount;
		}

		if (C.nutrient && C.nutrient.unitName) {
			ingredient.vitamins.C.unit = C.nutrient.unitName;
		}
	}

	let D = data.foodNutrients.find((item) => item.nutrient.id == 1114);

	if (D) {
		if (D.amount) {
			ingredient.vitamins.D.amount = D.amount;
		}

		if (D.nutrient && D.nutrient.unitName) {
			ingredient.vitamins.D.unit = D.nutrient.unitName;
		}
	}

	let E = data.foodNutrients.find((item) => item.nutrient.id == 1109);

	if (E) {
		if (E.amount) {
			ingredient.vitamins.E.amount = E.amount;
		}

		if (E.nutrient && E.nutrient.unitName) {
			ingredient.vitamins.E.unit = E.nutrient.unitName;
		}
	}

	let K = data.foodNutrients.find((item) => item.nutrient.id == 1185);

	if (K) {
		if (K.amount) {
			ingredient.vitamins.K.amount = K.amount;
		}

		if (K.nutrient && K.nutrient.unitName) {
			ingredient.vitamins.K.unit = K.nutrient.unitName;
		}
	}

	return ingredient;
}

// parseFoundationFoods () {}
// parseBrandedFoods () {}
// parseSRLegacyFoods () {}

// Initialize
(async () => {
	let dataFile, data;

	// 1. TODO: Connect to MongoDB  'mongoose.connect(mongoUri) );

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
