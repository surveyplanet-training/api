const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const restaurantSchema = new Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User',
		},
		address: {
			street: String,
			street2: String, // optional
			city: String,
			state: String,
			zip: String,
			country: String,
			phone: String,
		},
		geo: [Number], //longitude, latitude
		name: String,
		description: String,
		logo: String,
		totalTables: Number,
		theme: {
			type: ObjectId,
			ref: 'Theme',
		},
		// theme modifications??
		menu: {
			type: ObjectId,
			ref: 'Menu',
		},
		team: {
			type: ObjectId,
			ref: 'Team',
		},
	},
	{
		timestamps: {
			createdAt: 'created',
			updatedAt: 'updated',
		},
	}
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
