const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
	name: String,
	code: {
		type: String,
		unique: true,
	},	
	description: String,
	protein: {
		amount: Number,
		unit: String,
	},
	lipids: {
		amount: Number,
		unit: String,
	},
	carbohydrates: {
		amount: Number,
		unit: String,
	},
	energy: {
		amount: Number,
		unit: String,
	},
	fibers: {
		amount: Number,
		unit: String,
	},
	choline: {
		amount: Number,
		unit: String,
	},
	minerals: {
		calcium: {
			amount: Number,
			unit: String,
		},
		iron: {
			amount: Number,
			unit: String,
		},
		magnesium: {
			amount: Number,
			unit: String,
		},
		phosphorus: {
			amount: Number,
			unit: String,
		},
		potassium: {
			amount: Number,
			unit: String,
		},
		sodium: {
			amount: Number,
			unit: String,
		},
		zinc: {
			amount: Number,
			unit: String,
		},
		copper: {
			amount: Number,
			unit: String,
		},
		selenium: {
			amount: Number,
			unit: String,
		},
	},
	vitamins: {
		A1: {
			amount: Number,
			unit: String,
		},
		A: {
			amount: Number,
			unit: String,
		},
		caroteneAlpha: {
			amount: Number,
			unit: String,
		},
		caroteneBeta: {
			amount: Number,
			unit: String,
		},
		B1: {
			amount: Number,
			unit: String,
		},
		B2: {
			amount: Number,
			unit: String,
		},
		B3: {
			amount: Number,
			unit: String,
		},
		B5: {
			amount: Number,
			unit: String,
		},
		B6: {
			amount: Number,
			unit: String,
		},
		B7: {
			amount: Number,
			unit: String,
		},
		B9: {
			amount: Number,
			unit: String,
		},
		B12: {
			amount: Number,
			unit: String,
		},
		C: {
			amount: Number,
			unit: String,
		},
		D: {
			amount: Number,
			unit: String,
		},
		E: {
			amount: Number,
			unit: String,
		},
		K: {
			amount: Number,
			unit: String,
		},
	},
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
