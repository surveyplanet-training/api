const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const ingredientSchema = new Schema({
	name: String,
	description: String,
	foodNutrients: [
		{
			nutrient: {
				protein: {
					amount: Number,
					unit: String,
				},
				carbohydrates: {
					suggar: {
						amount: Number,
						unit: String,
					},
					other: {
						amount: Number,
						unit: String,
					},
				},
				fat: {
					amount: Number,
					unit: String,
				},
				calories: {
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
					manganese: {
						amount: Number,
						unit: String,
					},
					selenium: {
						amount: Number,
						unit: String,
					},
				},
				vitamins: {
					vitaminA: {
						amount: Number,
						unit: String,
					},
					vitaminB1: {
						amount: Number,
						unit: String,
					},
					vitaminB2: {
						amount: Number,
						unit: String,
					},
					vitaminB3: {
						amount: Number,
						unit: String,
					},
					vitaminB5: {
						amount: Number,
						unit: String,
					},
					vitaminB6: {
						amount: Number,
						unit: String,
					},
					vitaminB7: {
						amount: Number,
						unit: String,
					},
					vitaminB9: {
						amount: Number,
						unit: String,
					},
					vitaminB12: {
						amount: Number,
						unit: String,
					},
					vitaminC: {
						amount: Number,
						unit: String,
					},
					vitaminD: {
						amount: Number,
						unit: String,
					},
					vitaminE: {
						amount: Number,
						unit: String,
					},
					vitaminK: {
						amount: Number,
						unit: String,
					},
				},
			},
		},
	],
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
