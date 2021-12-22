const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const ingredientSchema = new Schema({
	
	
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
