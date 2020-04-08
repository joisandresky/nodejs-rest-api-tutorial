const jwt = require('jsonwebtoken');
const config = require('../config');

exports.isAuthenticated = function (req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, config.secret_key, function (err, result) {
            if (err) return res.status(401).send('Kamu Tidak memiliki token yang valid');

            req.user = result;
            next();
        })
    } else {
        return res.status(401).send('Kamu tidak boleh disini!');
    }
}