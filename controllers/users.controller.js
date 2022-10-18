const fs = require("fs");
const { validationResult } = require("express-validator");
const response = require("../response/response");
const { checkErrors } = require("../middleware/validation");

const randomUsers = () => {
  const users = fs.readFileSync("users.json");
  return JSON.parse(users);
};

module.exports.getRandromUser = async (req, res) => {
  const usersData = randomUsers();
  const randomNumber = await Math.ceil(Math.random() * usersData.length);
  const randomUser = usersData.find((user) => Number(user.id) === randomNumber);
  if (randomUser) {
    response.success(res, randomUser);
    return;
  } else {
    response.notFound(res);
    return;
  }
};

module.exports.getAllUser = (req, res) => {
  const usersData = randomUsers();
  if (req.query.max) {
    const maxData = usersData.slice(0, req.query.max);
    response.success(res, maxData);
    return;
  } else {
    response.success(res, usersData);
    return;
  }
};

module.exports.saveUser = (req, res) => {
  // check validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response.errorRes(errors.array(), res, 422);
    return;
  }

  const { id, gender, name, contact, address, photoUrl } = req.body;
  const prevUser = randomUsers();
  const alreayExist = prevUser.find((user) => user.id === id);

  if (alreayExist) {
    response.alreadyExist(res, id);
  } else {
    const usersData = prevUser;
    const newUser = {
      id: id,
      name: name,
      gender: gender,
      contact: contact,
      address: address,
      photoUrl: photoUrl,
    };
    usersData.push(newUser);
    try {
      fs.writeFileSync("users.json", JSON.stringify(usersData));
      response.success(res, randomUsers());
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
    return;
  }
};

module.exports.updateUser = (req, res) => {
  // check validation error

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response.errorRes(errors.array(), res, 422);
    return;
  }

  const { id, gender, name, contact, address, photoUrl } = req.body;
  const users = randomUsers();
  const isExist = users.find((user) => user.id === id);

  if (!isExist) {
    response.notFound(res);
    return;
  } else {
    let newRandomUsers = users;
    const userIndex = newRandomUsers.findIndex((user) => user.id === id);
    const findUser = users[userIndex];
    newRandomUsers[userIndex].name = name || findUser.name;
    newRandomUsers[userIndex].gender = gender || findUser.gender;
    newRandomUsers[userIndex].contact = contact || findUser.contact;
    newRandomUsers[userIndex].address = address || findUser.address;
    newRandomUsers[userIndex].photoUrl = photoUrl || findUser.photoUrl;
    try {
      fs.writeFileSync("users.json", JSON.stringify(newRandomUsers));
      response.success(res, newRandomUsers);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }
};

module.exports.deleteUser = (req, res) => {
  // check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response.errorRes(errors.array(), res, 422);
    return;
  }

  const { id } = req.body;
  const users = randomUsers();
  const alreayExist = users.find((user) => user.id === id);
  if (!alreayExist) {
    response.notFound(res);
  } else {
    const removeUser = users.filter((user) => user.id !== id);
    try {
      fs.writeFileSync("users.json", JSON.stringify(removeUser));
      response.success(res, removeUser);
    } catch (err) {
      res.send(err.message);
    }
  }
};

module.exports.multipleUpdate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response.errorRes(errors.array(), res, 422);
    return;
  }

  const updateUsers = req.body;
  const users = randomUsers();
  let updated = users;

  updated.forEach((user, i) => {
    updateUsers.forEach((upUser, index) => {
      if (updated[i].id === updateUsers[index].id) {
        updated[i].name = updateUsers[index].name || updated[i].name;

        updated[i].gender = updateUsers[index].gender || updated[i].gender;

        updated[i].contact = updateUsers[index].contact || updated[i].contact;

        updated[i].address = updateUsers[index].address || updated[i].address;

        updated[i].photoUrl =
          updateUsers[index].photoUrl || updated[i].photoUrl;
      }
    });
  });

  try {
    fs.writeFileSync("users.json", JSON.stringify(updated));
    response.success(res, updated);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};
