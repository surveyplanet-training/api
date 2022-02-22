const mongoose = require('mongoose');
const { Schema } = mongoose;
//const uuid = require('uuid/v3');
// const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
	{
		name: {
			first: {
				type: String,
				trim: true,
				default: '',
			},
			last: {
				type: String,
				trim: true,
				default: '',
			},
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			sparse: true,
			lowercase: true,
			// match: [
			// 	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			// 	'invalid email'
			// ]
		},
		phone: {
			type: String,
			trim: true,
			default: null,
		},
		photo: {
			type: String,
			default: null,
		},
		created: Date,
		updated: Date,
		loggedIn: Date,
		verified: {
			hash: {
				type: String,
				default:  () => (new Date().getTime()).toString(36),
			},
			//uuid needs to be used for this but we need to figure out how to use it in the model + change tests
			expires: {
				type: Date,
				default: () => new Date(Date.now() + (1000 * 60 * 60 * 24 * 1)),
			},
			date: {
				type: Date, 
				default: null
			},
		},
		password: String,
		passReset: {
			hash: String,
			expires: Date,
		},
		ip: {
			type: String,
			default: null,
		},
		notes: {
			type: String,
		},
		preferences: {
			currency: {
				type: String,
				default: 'USD',
			},
		},
	},
	{
		timestamps: {
			createdAt: 'created',
			updatedAt: 'updated',
		},
	}
);

const User = mongoose.model('User', userSchema);
module.exports = User;
