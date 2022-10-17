const fs = require("fs");
const { validationResult } = require("express-validator");

const users = () => {
  const users = fs.readFileSync("users.json");
  return JSON.parse(users);
};

module.exports.getRandromUser = async (req, res) => {
  const usersData = users();
  const randomNumber = await Math.ceil(Math.random() * usersData.length);
  const randomUser = usersData.find((user) => Number(user.id) === randomNumber);
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
  const usersData = users();
  if (req.query.number) {
    const limitData = usersData.slice(0, req.query.number);
    res.status(200).json({
      success: true,
      data: limitData,
    });
  } else {
    res.status(200).json({
      success: true,
      data: usersData,
    });
  }
};

module.exports.saveUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const {id, gender, name, contact, address, photoUrl } = req.body;
  const prevUser = users();
  const usersData = prevUser;

  const newUser = {
    id: id,
    gender: gender,
    name: name,
    contact: contact,
    address: address,
    photoUrl: photoUrl,
  };

  usersData.push(newUser);

  try {
    fs.writeFileSync("users.json", JSON.stringify(usersData));
    res.status(200).json({
      success: true,
      message: "Success",
      data: users(),
    });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports.updateUser = (req, res) => {
  res.send("Helllo update");
};
