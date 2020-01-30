const User = require('../models/user');

exports.create = (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ err });
        }
        user.hashed_password = undefined;
        res.status(201).json({ msg: 'user created successfully' });
    });
};