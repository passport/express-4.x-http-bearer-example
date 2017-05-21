module.exports = function(app, express){
    var api = express.Router();
    var timestamp = new Date().toISOString().slice(0, 23).replace('T', ' ');
    // api routes
    api.route('/')
        .get(function(req, res) {
            var msg = {
                description: 'This is a list of available endpoints and documentation.',
                endpoints:  {
                    Object: {
                        create: { POST:   app.baseUrl + '/api/objects/' },
                        read:   { GET:    app.baseUrl + '/api/object/:id' },
                        update: { PUT:    app.baseUrl + '/api/object/:id' },
                        delete: { DELETE: app.baseUrl + '/api/object/:id' },
                        index:  { GET:    app.baseUrl + '/api/objects/' }
                    },
                    User: {
                        read:    { GET:   app.baseUrl + '/api/user/' }
                    }
                },
                documentation:  {
                    Object: {
                        create: { POST:   app.baseUrl + '/docs/objects/' },
                        read:   { GET:    app.baseUrl + '/docs/object/:id' },
                        update: { PUT:    app.baseUrl + '/docs/object/:id' },
                        delete: { DELETE: app.baseUrl + '/docs/object/:id' },
                        index:  { GET:    app.baseUrl + '/docs/objects/' }
                    },
                    User: {
                        read:    { GET:   app.baseUrl + '/docs/user/' }
                    }
                }
            };
            res.json({ Error: false, Message: msg });
    });
    api.route('/objects')
        .get(function(req, res, next) { // Index 
            //index(app, req, res, next);
            meJSON = { Error: false, Message: "Indexed at "+timestamp };
            res.json(meJSON);
            app.errorLogger.info(meJSON);
            app.accessLogger.token('referrer', function (req) { return meJSON.Error; });
        })
        .post(function(req, res) { // Create
            //write(app,"create", req, res, next);
            meJSON = { Error: false, Message: "Created at "+timestamp };
            res.json(meJSON);
            app.errorLogger.info(meJSON);
            app.accessLogger.token('referrer', function (req) { return meJSON.Error; });
    });
    api.route('/object/:id')
        .get(function(req, res) { // Read
            //read(app, "object", req, res);
            meJSON = { Error: false, Message: "Read "+req.params.id+" at "+timestamp };
            res.json(meJSON);
            app.errorLogger.info(meJSON);
            app.accessLogger.token('referrer', function (req) { return meJSON.Error; });
        })
        .put(function(req, res, next) { // Update
            //write(app,"update", req, res, next);
            meJSON = { Error: false, Message: "Updated "+req.params.id+" at "+timestamp };
            res.json(meJSON);
            app.errorLogger.info(meJSON);
            app.accessLogger.token('referrer', function (req) { return meJSON.Error; });
        })
        .delete(function(req, res, next) { // Delete
            //write(app,"delete", req, res, next);
            meJSON = { Error: false, Message: "Deleted "+req.params.id+"at "+timestamp };
            res.json(meJSON);
            app.errorLogger.info(meJSON);
            app.accessLogger.token('referrer', function (req) { return meJSON.Error; });
    });
    app.use('/api', 
		app.Auth, // make sure we have authenticated via bearer token
	api); // all of our api routes will be prefixed with /api
}