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
