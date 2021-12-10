const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const menuItemSchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'User',
	},
	ingredients: [
		{
			type: ObjectId,
			ref: 'Ingredient',
		},
	],
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
