const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/v1/users.route");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());


//random user route

app.use("/api/v1/user/", userRouter);

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
