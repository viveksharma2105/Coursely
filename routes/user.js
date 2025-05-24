// const express = require("express")
// const Router = express.Router;
//---------OR----------------
const {Router} = require("express");
const userRouter = Router();


userRouter.post("/signup", function (req, res){
res.json({
    message: "signup endPoint"
})
})

userRouter.post("/signin", function (req, res){
res.json({
    message: "signin endPoint"
})
})

userRouter.get("/purchases", function (req, res){
res.json({
    message: "UserPurchase endPoint"
})
})

module.exports = {
    userRouter: userRouter
}