const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} =  require("../db")
const  {z} = require("zod")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { email, json } = require("zod/v4");
const { parse } = require("zod/v4-mini");
const  {JWT_ADMIN_SECRET} = require("../config");
const {adminMiddleware} = require("../middleware/admin")

adminRouter.post("/signup",async function (req, res){
    const reqBody = z.object({
         email: z.string().min(3).max(100).email(),
        password: z.string().min(4),
        firstName: z.string().min(3),
        lastName: z.string().min(3).max(8)
    })

    try {
        const parsedBody = reqBody.parse(req.body);

        const hashPassword = await bcrypt.hash(parsedBody.password,10);

        const newAdmin = adminModel.create({
            email: parsedBody.email,
            password: hashPassword,
            firstName: parsedBody.firstName,
            lastName: parsedBody.lastName
        })

res.status(201).json({message: "Admin create successfully"});

    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

adminRouter.post("/signin",async function (req, res){
    const {email, password} =  req.body;
   const admin = await adminModel.findOne({
        email 
    });

    if (!admin) {
        res.status(403).json({message: "Admin doesn't Exist"})
        
    }
  const passwordMatch = await bcrypt.compare(password,   admin.password)
  if(passwordMatch){
    const token = jwt.sign({
        admin: admin._id.toString()
    },JWT_ADMIN_SECRET)
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


//create a course
adminRouter.post("/course",adminMiddleware, async function(req, res){
const adminId = req.userId;

const {title, description, imageUrl, price}  = req.body;
const course = await adminModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId
})


    res.json({
    message: "courseCreated ",
    courseId : course._id
})
})

adminRouter.put("/course",adminMiddleware, async function (req, res){
const adminId = req.userId;

const {title, description, imageUrl, price, courseId}  = req.body;

const course = await courseModel.updateOne({
    //if these feilds are saatisfied then the it'll be updateable
    _id: courseId,
    create: courseId
},{
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    
})


    res.json({
    message: "Course Updated ",
    courseId : course._id
})
})

adminRouter.get("/course/bulk",adminMiddleware, async function (req, res){
const adminId = req.userId;

const {title, description, imageUrl, price, courseId}  = req.body;

const courses = await courseModel.find({
    courseId: adminId

});


    res.json({
    message: "Course Updated ",
    courses
})
})

module.exports = {
    adminRouter: adminRouter
}


