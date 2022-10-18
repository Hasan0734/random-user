module.exports.notFound = (res) => {
  res.status(404).json({
    success: false,
    error: `User not found!`,
  });
  return;
};

module.exports.success = (res, data) => {
  res.status(200).json({
    success: true,
    message: "Success",
    data: data,
  });
  return;
};

module.exports.alreadyExist = (res, id) => {
  res.status(302).json({
    success: false,
    error: `This id: ${id} already exist`,
  });
  return;
};

module.exports.errorRes = (errors, res, status) => {
  res.status(status).json({ errors: errors });
};
