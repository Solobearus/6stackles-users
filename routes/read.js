const User = require('../models/user');

exports.read = (req, res) => {
    const query = req.params.userId || '';

    User.findOne({ _id: query })
        .then((user) => {
            user.hashed_password = undefined;
            user.salt = undefined;
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
};

exports.readAll = (req, res) => {
    User.find({})
        .then(users => {
            users.map(user => {
                user.hashed_password = undefined;
                user.salt = undefined;
                return user;
            })
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
};