'use strict';

var hapi = require('hapi');
var hapiAuthBearerToken = require('hapi-auth-bearer-token');
var Promise = require('bluebird');
var Joi = require('joi');
var inert = require('inert');
var path = require('path');

var authenticator = require('./authenticator');
var db = require('./db');
Promise.longStackTraces();

var HapiServer = hapi.Server;

module.exports = function createApp()
{
    var app = new HapiServer();
    app.connection({
        port: 9000, host: 'localhost', routes: {
            files: {
                relativeTo: path.join(__dirname, '../public')
            }
        }
    });

    app.register([hapiAuthBearerToken, inert], function (err)
    {
        if (err) {
            throw err;
        }
    });

    app.auth.strategy('bearer', 'bearer-access-token', {
        validateFunc: function (token, callback)
        {
            if (authenticator.authenticate(token)) {
                callback(null, true, {});
            }
            else {
                callback(null, false, null);
            }
        }
    });

    app.auth.default('bearer');

    var postUserSchema = {
        id: Joi.number(),
        name: Joi.string().required().min(1).max(10),
        owner: Joi.string(),
        createDate: Joi.number().min(0)
    };

    app.route({
        method: 'POST',
        path: '/dog',
        config: {
            payload: {
                maxBytes: 70
            },
            validate: {
                payload: postUserSchema
            }
        },
        handler: function (request, reply)
        {
            var dog = request.payload;
            db.save('dog', dog).then(function (result)
            {
                reply(result);
            }).catch(function (error)
            {
                console.log(error);
                var statusCode = 'Entity not found' === error ? 404 : 500;
                reply(error).code(statusCode);
            });
        }
    });

    app.route({
        method: 'GET',
        path: '/dog/{id}',
        handler: function (request, reply)
        {
            db.get('dog', request.params.id).then(function (result)
            {
                reply(result);
            }).catch(function (error)
            {
                var statusCode = 'Entity not found' === error ? 404 : 500;
                reply(error).code(statusCode);
            });
        }
    });

    app.route({
        method: 'GET',
        path: '/hound/{id}',
        config: {
            auth: false
        },
        handler: function (request, reply)
        {
            reply.redirect('/dog/' + request.params.id);
        }
    });

    app.route({
        method: 'GET',
        path: '/{param*}',
        config: {
            auth: false
        },
        handler: {
            directory: {
                path: '.'
            }
        }
    });

    return app;
};
