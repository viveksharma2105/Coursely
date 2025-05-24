// const express = require("express")
// const Router = express.Router;
//---------OR----------------
const {Router} = require("express");
const {userModel} = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_USER_PWD = "secret123321";
const {z} = require("zod");

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

        const hashPassword  = await bcrypt.hash(parsedBody.password, 10);
        const newUser = await userModel.create({
            email: parsedBody.email,
            password: hashPassword,
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




userRouter.post("/signin", async function (req, res){
    const {email, password} = req.body;
    const user = await userModel.findOne({
        email: email 
    });

   if(!user){    
    res.status(403).json({
    message: "User Doesn't exist"
})
}
      const passwordMatch = await bcrypt.compare(password, user.password)
 

if(passwordMatch){
     const token = jwt.sign({
            id: user._id.toString()
        },JWT_USER_PWD)
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
           message: "incorrect credentials"
        })
    }
}

)

userRouter.get("/purchases", function (req, res){
res.json({
    message: "UserPurchase endPoint"
})
})

module.exports = {
    userRouter: userRouter
}