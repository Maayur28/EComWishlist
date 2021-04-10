const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require('dotenv').config();

const url =process.env.URL;
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const wishlistprodSchema = mongoose.Schema({
  _id: { type: Number, required: [true, "_id is required"] },
  name: { type: String, required: [true, "Name is required"] },
  rating: { type: Number, required: [true, "Rating is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  image: { type: String, required: [true, "Image is required"] },
  idealFor: {
    type: String,
    enum: {
      values: ["men", "women", "kids"],
      message: "Ideal for either Men,Women or Kids",
    },
  },
  discount: { type: Number },
});
const wishlistSchema=mongoose.Schema({
  userid:{type:String,required:[true,"userid is required"]},
  wishlistItem:[wishlistprodSchema]
})


let connection = {};
connection.getWishlistConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model("Wishlist", wishlistSchema,"wishlist");
    return model;
  } catch (error) {
    let err = new Error("Could not establish connection with Wishlist database");
    err.status = 500;
    throw err;
  }
};
module.exports = connection;
