const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.register = function (req, res) {
    let body = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.status(500).send(err);

        bcrypt.hash(body.password, salt, function (err, hash) {
            if (err) return res.status(500).send(err);

            body.password = hash;

            User.create(body, function (err, newUser) {
                if (err) return res.status(500).send(err);

                return res.status(201).json({ message: "User berhasil dibuat!", user: newUser });
            })
        });
    });
}

exports.login = function (req, res) {
    User.findOne({
        username: req.body.username
    }).exec(function (err, user) {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User tidak ditemukan');

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
                _id: user._id,
                username: user.username
            }

            let token = jwt.sign(payload, config.secret_key, {
                expiresIn: "2d"
            })

            return res.status(200).json({
                message: "Berhasil Login",
                token: token
            });
        } else {
            return res.status(422).json({ message: 'Password tidak valid!' });
        }
    })
}