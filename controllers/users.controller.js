const fs = require("fs");
const { validationResult } = require("express-validator");

const randomUsers = () => {
  const users = fs.readFileSync("users.json");
  return JSON.parse(users);
};

module.exports.getRandromUser = async (req, res) => {
  const usersData = randomUsers();
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
  const usersData = randomUsers();
  if (req.query.max) {
    const maxData = usersData.slice(0, req.query.max);
    res.status(200).json({
      success: true,
      data: maxData,
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
  const { id, gender, name, contact, address, photoUrl } = req.body;
  const prevUser = randomUsers();

  const alreayExist = prevUser.find((user) => user.id === id);
  if (alreayExist) {
    res.status(302).json({
      success: false,
      error: `This id: ${id} already exist`,
    });
  } else {
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
        data: randomUsers(),
      });
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }
};

module.exports.updateUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const { id, gender, name, contact, address, photoUrl } = req.body;

  const randomUsers = randomUsers();
  const isExist = randomUsers.find((user) => user.id === id);
  console.log(id);
  if (!isExist) {
    res.status(404).json({
      success: false,
      error: `Not found user`,
    });
  } else {
    const newRandomUsers = randomUsers;
    let userIndex = newRandomUsers.findIndex((user) => user.id === id);
    const findUser = randomUsers[userIndex];
    newRandomUsers[userIndex].name = name || findUser.name;
    newRandomUsers[userIndex].gender = gender || findUser.gender;
    newRandomUsers[userIndex].contact = contact || findUser.contact;
    newRandomUsers[userIndex].address = address || findUser.address;
    newRandomUsers[userIndex].photoUrl = photoUrl || findUser.photoUrl;
    try {
      fs.writeFileSync("users.json", JSON.stringify(newRandomUsers));
      res.status(200).json({
        success: true,
        message: "Success",
        data: randomUsers()[userIndex],
      });
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }
};

module.exports.deleteUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const { id } = req.body;
  const randomUsers = randomUsers();

  const alreayExist = randomUsers.find((user) => user.id === id);
  if (!alreayExist) {
    res.status(404).json({
      success: false,
      error: `Not found user`,
    });
  } else {
    const removeUser = randomUsers.filter((user) => user.id !== id);
    try {
      fs.writeFileSync("users.json", JSON.stringify(removeUser));
      res.status(200).json({
        success: true,
        message: "Success",
        data: randomUsers()[userIndex],
      });
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }
};
