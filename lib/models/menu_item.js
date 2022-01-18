const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const menuItemSchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'User',
	},
	name : String,
	ingredients: [
		{
			ingredient: {
				type: ObjectId,
				ref: 'Ingredient',
			},
			grams: Number,
		}
	],
	description: String,
	picture: String,
	category: String,
	portion: [
		{
			name: String, // small, medium, large
			grams: Number, // in grams
			price: Number,	
			currency: {
				type: String,
				default: 'USD',
				validate: /^[A-Z]{3}$/
			} 
		}	
	],
	tags: [String], // vegan, kosher, halal
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
