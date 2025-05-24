const express = require("express");
const mongoose = require("mongoose")

const { userRouter } = require("./routes/user");
const {courseRouter} = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)



async function main(params) {
    await mongoose.connect("mongodb+srv://23csu347:vivek23csu347@cluster0.5guydqd.mongodb.net/coursely-app")
app.listen(3000);
console.log("listen on port 3000")
}

main()