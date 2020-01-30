const User = require('../models/user');

exports.update = (req, res) => {
    const allowedFields = [
        'name',
        'phone',
        'email',
        'password',
    ];
    const fieldsToUpdate = {};

    Object.keys(req.body).forEach(key => {
        if (allowedFields.includes(key)) {
            fieldsToUpdate[key] = req.body[key];
        }
    });

    User.findOne({ _id: req.params.userId })
        .then(user => {
            Object.keys(fieldsToUpdate).forEach(key => {
                user[key] = fieldsToUpdate[key];
            });
            user.save((err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).send({ msg: 'user updated successfully' });
            });
        })
};