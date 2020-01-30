const User = require('../models/user');

exports.remove = (req, res) => {

    User.findByIdAndRemove(req.params.userId)
        .then(result => {
            result ?
                res.status(200).send({ msg: 'user deleted successfully' }) :
                res.status(500).send({ err: 'no user found by this id' });
            //TODO: bulk products delete when deleting user
        })
        .catch(err => res.status(500).send(err));
};