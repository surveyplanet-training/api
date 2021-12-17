const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const menuSchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'User',
	},
	language: String,
	items: [
		{
			type: ObjectId,
			ref: 'MenuItem',
		},
	],
	showIngredients: Boolean,
	showAmmounts: Boolean,
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
