const {Router} = require("express");
const adminRouter = Router();
const {adminModle} =  require("../db")

adminRouter.post("/signup", function (req, res){
res.json({
    message: "signup endPoint"
})
})

adminRouter.post("/signin", function (req, res){
res.json({
    message: "signin endPoint"
})
})


//create a course
adminRouter.post("/course",function(req, res){
    res.json({
    message: "courseCreated endPoint"
})
})

adminRouter.put("/course", function (req, res){
res.json({
    message: "updateCourse endPoint"
})
})


adminRouter.get("/course/bulk", function (req, res){
res.json({
    message: "updateCourse endPoint"
})
})



module.exports = {
    adminRouter: adminRouter
}


