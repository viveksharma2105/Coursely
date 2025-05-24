const {Router} = require("express");
const courseRouter = Router();


courseRouter.post("/purchase", function (req, res){
    //you would expext the for payment
res.json({
    message: "Purchase endPoint"
})
})

courseRouter.get("/preview", function (req, res){
res.json({
    message: "Coursereview endPoint"
})
})

module.exports = {
    courseRouter: courseRouter
}

