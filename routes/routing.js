const express = require('express');
const routes=express.Router();
const service=require('../services/user');
const auth=require('../utilities/auth');

routes.post('/togglewishlist',auth,async(req,res,next)=>{
    req.body.userid=req.user.userid;
    req.body.image=req.body.image[0];
    try {
        let toggleproduct=await service.toggleProduct(req.body);
        res.json({'toggle':toggleproduct}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.delete('/removewishlist',auth,async(req,res,next)=>{
    req.body.userid=req.user.userid;
    try {
        let getWishlist=await service.removeWishlist(req.body);
        res.json({'wish':getWishlist}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.get('/getwishlist',auth,async(req,res,next)=>{
    try {
        let getwishlist=await service.getWishlist(req.user.userid);
        res.send({'wish':getwishlist}).status(200);
    } catch (error) {
        next(error);
    }
})
module.exports=routes;