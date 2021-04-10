const validator = require("../utilities/validate");
const model = require("../models/user");
const _ = require("lodash");
let userService = {};

userService.toggleProduct = async(data) => {
  let obj=_.pick(data,["userid",'_id','name','rating','price','image','discount','idealFor']);
  return await model.toggleProduct(obj);
};
userService.getWishlist = async(userid) => {
  return await model.getWishlist(userid);
};
userService.removeWishlist = async(obj) => {
  return await model.removeWishlist(obj);
};
module.exports = userService;