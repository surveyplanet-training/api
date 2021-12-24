const fs = require('fs');
const rawData = require('../data/FoodData_Central_survey_food_json_2021-10-28.json');
const mongoose = require('mongoose');
const Ingredient = require('../lib/models/ingredient.js');

(async function parseRawData() {
	for (i = 0; i < rawData.SurveyFoods.length; i++) {
		try {
			const ingredient = new Ingredient({
				name: rawData.SurveyFoods[i].description,
				foodNutrients: {
					protein: {
						amount: rawData.SurveyFoods[i].foodNutrients[0].amount,
						unit: Object.values(rawData.SurveyFoods[i].foodNutrients[0])[2]
							.unitName,
					},
					lipids: {
						amount: rawData.SurveyFoods[i].foodNutrients[1].amount,
						unit: Object.values(rawData.SurveyFoods[i].foodNutrients[1])[2]
							.unitName,
					},
					carbohydrates: {
						amount: rawData.SurveyFoods[i].foodNutrients[2].amount,
						unit: Object.values(rawData.SurveyFoods[i].foodNutrients[2])[2]
							.unitName,
					},
					energy: {
						amount: rawData.SurveyFoods[i].foodNutrients[3].amount,
						unit: Object.values(rawData.SurveyFoods[i].foodNutrients[3])[2]
							.unitName,
					},
					fibers: {
						amount: rawData.SurveyFoods[i].foodNutrients[9].amount,
						unit: Object.values(rawData.SurveyFoods[i].foodNutrients[9])[2]
							.unitName,
					},
					choline: {
						amount: rawData.SurveyFoods[i].foodNutrients[35].amount,
						unit: Object.values(rawData.SurveyFoods[i].foodNutrients[35])[2]
							.unitName,
					},
					minerals: {
						calcium: {
							amount: rawData.SurveyFoods[i].foodNutrients[10].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[10])[2]
								.unitName,
						},
						iron: {
							amount: rawData.SurveyFoods[i].foodNutrients[11].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[11])[2]
								.unitName,
						},
						magnesium: {
							amount: rawData.SurveyFoods[i].foodNutrients[12].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[12])[2]
								.unitName,
						},
						phosphorus: {
							amount: rawData.SurveyFoods[i].foodNutrients[13].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[13])[2]
								.unitName,
						},
						potassium: {
							amount: rawData.SurveyFoods[i].foodNutrients[14].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[14])[2]
								.unitName,
						},
						sodium: {
							amount: rawData.SurveyFoods[i].foodNutrients[15].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[15])[2]
								.unitName,
						},
						zinc: {
							amount: rawData.SurveyFoods[i].foodNutrients[16].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[16])[2]
								.unitName,
						},
						copper: {
							amount: rawData.SurveyFoods[i].foodNutrients[17].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[17])[2]
								.unitName,
						},
						selenium: {
							amount: rawData.SurveyFoods[i].foodNutrients[18].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[18])[2]
								.unitName,
						},
					},
					vitamins: {
						A1: {
							amount: rawData.SurveyFoods[i].foodNutrients[19].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[19])[2]
								.unitName,
						},
						A: {
							amount: rawData.SurveyFoods[i].foodNutrients[20].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[20])[2]
								.unitName,
						},
						caroteneAlpha: {
							amount: rawData.SurveyFoods[i].foodNutrients[22].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[22])[2]
								.unitName,
						},
						caroteneBeta: {
							amount: rawData.SurveyFoods[i].foodNutrients[21].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[21])[2]
								.unitName,
						},
						B1: {
							amount: rawData.SurveyFoods[i].foodNutrients[29].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[29])[2]
								.unitName,
						},
						B2: {
							amount: rawData.SurveyFoods[i].foodNutrients[30].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[30])[2]
								.unitName,
						},
						B3: {
							amount: rawData.SurveyFoods[i].foodNutrients[31].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[31])[2]
								.unitName,
						},
						B6: {
							amount: rawData.SurveyFoods[i].foodNutrients[32].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[32])[2]
								.unitName,
						},
						B9: {
							amount: rawData.SurveyFoods[i].foodNutrients[33].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[33])[2]
								.unitName,
						},
						B12: {
							amount: rawData.SurveyFoods[i].foodNutrients[34].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[34])[2]
								.unitName,
						},
						C: {
							amount: rawData.SurveyFoods[i].foodNutrients[28].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[28])[2]
								.unitName,
						},
						D: {
							amount: rawData.SurveyFoods[i].foodNutrients[24].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[24])[2]
								.unitName,
						},
						E: {
							amount: rawData.SurveyFoods[i].foodNutrients[23].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[23])[2]
								.unitName,
						},
						K: {
							amount: rawData.SurveyFoods[i].foodNutrients[36].amount,
							unit: Object.values(rawData.SurveyFoods[i].foodNutrients[36])[2]
								.unitName,
						},
					},
				},
			});
			console.log(ingredient);
		} catch (e) {
			console.log(e.message);
		}
	}
})();
