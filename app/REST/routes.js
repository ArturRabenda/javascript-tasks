(function ()
{
    'use strict';
    var userManager = require('../business/user.manager');

    function authenticate(request, response, next)
    {
        if (!request.headers.authorization) {
            next();
        } else {
            var token = request.headers.authorization.substring(6);
            token = new Buffer(token, 'base64').toString('ascii');
            userManager.getUserByToken(token).then(function (result)
            {
                request.user = result;
            }).catch(function (e)
            {
                if (e !== 'NOT_FOUND') {
                    console.error(e);
                    response.sendStatus(500);
                }
            }).finally(next);
        }
    }

    module.exports = function (router)
    {
        router.use(authenticate);
        require('./phone.endpoint')(router);
        require('./user.endpoint')(router);
    };
})();
