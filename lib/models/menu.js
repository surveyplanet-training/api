const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const menuSchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'User',
		//required: true,
	},
	language: {
		type: String,
		default: 'en' 
	},
	name: String,
	items: [
		{
			type: ObjectId,
			ref: 'MenuItem',
		},
	],
	showIngredients: Boolean,
	showAmounts: Boolean,
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
