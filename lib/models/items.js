const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const menuSchema = new Schema({
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

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
