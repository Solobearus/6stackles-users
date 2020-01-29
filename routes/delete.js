const User = require('../models/user');

exports.remove = (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err.message
            });
        }
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};