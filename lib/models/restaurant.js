const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const teamSchema = new Schema({

	user: {
		type: ObjectId,
		ref: 'User'
	},

	privileges: {
		type: String,
		enum: [
			'admin',
			'write',
			'read',
		],
		default: 'read'
	}

});


const restaurantSchema = new Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User'
		},
		team: [teamSchema],
	},
	{
		timestamps: { 
			createdAt: 'created',
			updatedAt: 'updated'
		}
	}
);


const User = mongoose.model('User', restaurantSchema);
module.exports = User;
