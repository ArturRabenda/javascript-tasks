'use strict';

var sha1 = require('sha1');
var userDAO = require('../DAO/userDAO');

var tokens = {};

function hashPassword(password)
{
    return sha1(password);
}

function authenticate(email, password)
{
    return userDAO.getByEmail(email).then(function (user)
    {
        if (user.password === hashPassword(password)) {
            var token = sha1(Date.now());
            tokens[token] = user._id;
            return token;
        } else {
            throw 'UNAUTHORIZED';
        }
    });
}

function getUserByToken(token)
{
    return userDAO.get(tokens[token]).catch(function (e)
    {
        if (e === 'NOT_FOUND') {
            return null;
        }
    });
}

module.exports = {
    authenticate: authenticate,
    getUserByToken: getUserByToken
};

