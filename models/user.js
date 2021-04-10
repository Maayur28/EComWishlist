const dbModel = require("../utilities/connection");

let userModel = {};

userModel.toggleProduct = async (data) => {
  let model = await dbModel.getWishlistConnection();
  let checkempty = await model.findOne({ userid: data.userid });
  if (!checkempty) {
    let obj = {};
    obj.userid = data.userid;
    delete data.userid;
    obj.wishlistItem = [data];
    let addWish = await model.create(obj);
    if (addWish) {
      return true;
    } else {
      let err = new Error();
      err.status = 500;
      err.message = "Sorry! Server is busy,Please try adding to wishlist after sometime";
      throw err;
    }
  } else {
    let getproductList = await model.findOne({
      userid: data.userid,
      "wishlistItem._id": data._id,
    });
    if (!getproductList) {
      let uid = data.userid;
      delete data.userid;
      let pushitem = await model.updateOne(
        { userid: uid },
        { $push: { wishlistItem: data } }
      );
      if (pushitem.nModified > 0) return true;
      else {
        let err = new Error();
        err.status = 500;
        err.message = "Sorry! Server is busy,Please try adding to wishlist after sometime";
        throw err;
      }
    } else {
      let removeWish = await model.updateOne(
        { userid: data.userid },
        { $pull: { wishlistItem: { _id: data._id } } }
      );
      if (removeWish.nModified === 1) return false;
      else {
        let err = new Error();
        err.status = 500;
        err.message = "Sorry! Server is busy,Please try removing from wishlist after sometime";
        throw err;
      }
    }
  }
};
userModel.removeWishlist = async (data) => {
  let model = await dbModel.getWishlistConnection();
  let removeWish = await model.updateOne(
    { userid: data.userid },
    { $pull: { wishlistItem: { _id: data._id } } }
  );
  if (removeWish.nModified == 1) {
    let wishdata = await model.findOne(
      { userid: data.userid },
      { wishlistItem: 1, _id: 0 }
    );
    return wishdata.wishlistItem;
  } else {
    let err = new Error();
    err.status = 500;
    err.message = "Sorry! Server is busy,Please try removing from wishlist after sometime";
    throw err;
  }
};
userModel.getWishlist = async (id) => {
  /* getwishlist */
  let model = await dbModel.getWishlistConnection();
  let getwishlist = await model.findOne(
    { userid: id },
    { wishlistItem: 1, _id: 0 }
  );
  if (!getwishlist) {
    let obj = {};
    obj.userid = id;
    obj.wishlistItem = [];
    await model.create(obj);
    let findwish = await findOne({ userid: id });
    if (findwish) return [];
    else {
      let err = new Error();
      err.status = 500;
      err.message = "Sorry! Server is busy,Please try adding to wishlist after sometime";
      throw err;
    }
  } else return getwishlist.wishlistItem;
};
module.exports = userModel;
