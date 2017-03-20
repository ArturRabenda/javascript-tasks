'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var expressJoi = require('express-joi');
var Joi = expressJoi.Joi;
var authenticator = require('./authenticator');
var db = require('./db');
Promise.longStackTraces();

module.exports = function createApp() {

    var app = express();
    app.use(bodyParser.json({limit: '70b'}));
    app.use(express.static('public'));

    function authorizer(req, res, next) {
        var match = (req.headers.authorization || '').match(/^Bearer (.*)/);
        if (match && match[1] && authenticator.authenticate(match[1])) {
            next();
            return;
        }
        res.sendStatus(401);
    }

    var postUserSchema = {
        id: Joi.number(),
        name: Joi.string().required().min(1).max(10),
        owner: Joi.string(),
        createDate: Joi.number().min(0)
    };

    app.post('/dog', authorizer, expressJoi.joiValidate(postUserSchema), function (req, res) {
        var dog = req.body;
        db.save('dog', dog).then(function (result) {
            res.send(result);
        }).catch(function (error) {
            var statusCode = 'Entity not found' === error ? 404 : 500;
            res.status(statusCode).send(error);
        });
    });

    app.get('/dog/:id', authorizer, function (req, res) {
        db.get('dog', req.params.id).then(function (result) {
            res.send(result);
        }).catch(function (error) {
            var statusCode = 'Entity not found' === error ? 404 : 500;
            res.status(statusCode).send(error);
        });
    });

    app.get('/hound/:id', function (req, res) {
        res.redirect('/dog/' + req.params.id);
    });


    return app;
};
