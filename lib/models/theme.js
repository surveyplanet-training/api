const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const themeShema = new Schema({
	name: String,
	font: String,
	css: String,
	template: { type: Boolean, default: false },
	user: { type: ObjectId, ref: 'User' },
});
