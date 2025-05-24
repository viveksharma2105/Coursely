// const express = require("express")
// const Router = express.Router;
//---------OR----------------
const {Router} = require("express");
const {userModel} = require("../db")
const userRouter = Router();


userRouter.post("/signup", async function (req, res){
    const {email, password, firstName, lastName} = req.body;
   await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

res.json({
    message: "Signup Succeeded"
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