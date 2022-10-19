const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/v1/users.route");
const { body } = require("express-validator");
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(body());

//random user route
app.use("/api/v1/user/", userRouter);

// root response
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, Welcome !",
  });
});

// not found route
app.all("*", (req, res) => {
  res.send("Route not found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
