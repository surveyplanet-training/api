const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const teamSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },

  privileges: {
    type: String,
    enum: ["admin", "write", "read"],
    default: "read",
  },
});

const restaurantSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
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

    template: {
      type: ObjectId,
      ref: "Template",
    },
    menu: {
      type: ObjectId,
      ref: "Menu",
    },

    tables: [{ name: String }],

    team: [teamSchema],
  },

  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
