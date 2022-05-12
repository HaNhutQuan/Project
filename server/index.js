const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const app = express();

dotenv.config();
mongoose.connect(process.env.DB_URL, () => {
      console.log("CONNECTED TO MONGO DB");
})

app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/v1/", authRoute);
app.use("/v1/", userRoute);
app.use("/v1/", postRoute);
app.use("/v1", commentRoute);

app.listen(8000, () => {
      console.log("Server is running");
})