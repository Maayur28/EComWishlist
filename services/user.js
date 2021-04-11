const validator = require("../utilities/validate");
const model = require("../models/user");
const _ = require("lodash");
let userService = {};

userService.toggleProduct = async(data) => {
  let obj=_.pick(data,["userid",'_id','name','rating','price','image','discount','idealFor']);
  if(validator.toggleWishlist(obj))
  return await model.toggleProduct(obj);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Items not found,Please check the items and try again";
    throw err;
  }
};
userService.getWishlist = async(userid) => {
  if(validator.getWishlist(userid))
  return await model.getWishlist(userid);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Items not found,Please check the items and try again";
    throw err;
  }
};
userService.removeWishlist = async(obj) => {
  if(validator.toggleWishlist(obj))
  return await model.removeWishlist(obj);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Items not found,Please check the items and try again";
    throw err;
  }
};
module.exports = userService;