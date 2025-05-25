require('dotenv').config()
console.log(process.env.MONGO_URL);


const express = require("express");
const mongoose = require("mongoose")

const { userRouter } = require("./routes/user");
const {courseRouter} = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)



async function main(params) {
    await mongoose.connect(process.env.MONGO_URL)
app.listen(3000);
console.log("listen on port 3000")
}

main()