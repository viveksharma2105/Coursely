// const express = require("express")
// const Router = express.Router;
//---------OR----------------
const {Router} = require("express");
const {userModel} = require("../db")
const {z} = require("zod")
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
    const reqBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(4),
        firstName: z.string().min(3),
        lastName: z.string().min(3).max(8)
    });

    try {
           const parsedBody = reqBody.parse(req.body);
        
        const newUser = await userModel.create({
            email: parsedBody.email,
            password: parsedBody.password,
            firstName: parsedBody.firstName,
            lastName: parsedBody.lastName
        });

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});




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