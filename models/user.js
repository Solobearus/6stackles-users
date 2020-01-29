const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate:/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        },
        phone: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            validate: /^05\d([-]{0,1})\d{7}$/
        },
        hashed_password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        },
        salt: String
    },
    { timestamps: true }
);

userSchema
    .virtual('password')
    .set(function (password){
        this._password = password;
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10, 16, `sha256`).toString(`hex`);
        return this.hashed_password === hash;
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            this.salt = crypto.randomBytes(16).toString('hex');
            return crypto.pbkdf2Sync(password, this.salt, 10, 16, `sha256`).toString(`hex`);
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);