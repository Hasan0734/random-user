const fs = require("fs");

const users = () => {
  const users = fs.readFileSync("users.json");
  return JSON.parse(users);
};

module.exports.getRandromUser = async (req, res) => {
  const usersData = users();
  const randomNumber = await Math.ceil(Math.random() * usersData.length);
  const randomUser = usersData.find((user) => user.id === randomNumber);
  if (randomUser) {
    res.status(200).json({
      success: true,
      data: randomUser,
    });
  } else {
    res.status(404).json({
      success: false,
      error: "Not found !",
    });
  }
};

module.exports.getAllUser = (req, res) => {
  res.send("get all user");
};
