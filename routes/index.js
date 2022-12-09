'use strict';
module.exports = function(app){
    var genericController = require('../controllers/generic.controller');
    app.group('/api', (router) => {
        router.get('/', genericController.rootRequest);
    });
}