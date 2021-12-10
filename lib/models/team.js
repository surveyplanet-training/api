const mongoose = require('mongoose');
const {Schema} = mongoose;
const {ObjectId} = mongoose.Types;

const memberSchema = new Schema({

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


const teamSchema = new Schema(
	{

		user: {
			type: ObjectId,
			ref: 'User',
			required: true,
			unique: true
		},
		
		members: [memberSchema],
		
		created: {
			type: Date,
			default: Date.now
		},

		updated: {
			type: Date,
			default: Date.now
		}
	}

	, {
		timestamps: { 
			createdAt: 'created',
			updatedAt: 'updated'
		}
	}
);


const Team = mongoose.model('Teams', teamSchema);
module.exports = Team;