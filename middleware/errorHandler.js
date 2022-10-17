const errorHandler = (err, req, res, next) => {
    res.send(err.messsage);
}

module.exports = errorHandler