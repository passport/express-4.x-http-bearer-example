module.exports = function(app,express){
    /* docs routes */
    var docs = express.Router();
    docs.route('/').get(function(req, res) { // List endpoints
        var msg = {
            description: 'This is a list of available endpoints and documentation.',
            endpoints:  {
                Object: {
                    create: { POST:   app.baseUrl + '/api/object/' },
                    read:   { GET:    app.baseUrl + '/api/object/:id' },
                    update: { PUT:    app.baseUrl + '/api/object/:id' },
                    delete: { DELETE: app.baseUrl + '/api/object/:id' },
                    index:  { GET:    app.baseUrl + '/api/objects/' }
                }
            },
            documentation:  {
                Object: {
                    create: { POST:   app.baseUrl + '/docs/objects/' },
                    read:   { GET:    app.baseUrl + '/docs/object/:id' },
                    update: { PUT:    app.baseUrl + '/docs/object/:id' },
                    delete: { DELETE: app.baseUrl + '/docs/object/:id' },
                    index:  {
                              GET:    app.baseUrl + '/docs/objects/',
                    }
                },
                User: {
                    read:    { GET:   app.baseUrl + '/user/' }
                }
            }
        };
        res.json({ Error: false, Message: msg });
    });
    docs.route('/objects')
        .get(function(req, res, next) { // Index 
            var msg = {
                description: 'This is the Object Index, a list of all objects.',
                endpoint: '[GET: ' + app.baseUrl + '/api/objects/]',
                CRUDI: 'Index'
            };
            res.json({ Error: false, Message: msg });
        })
        .post(function(req, res) { // Create
            var msg = {
                description: 'This Creates a single record.',
                endpoint: '[POST: ' + app.baseUrl + '/api/objects/]',
                CRUDI: 'Create',
                postBodyParameters: {
                    param1:  { required: false, type: 'integer', sample: 45301 },
                    param2:   { required: false, type: 'string',  sample: 'Example string' }
                }
            };
            res.json({ Error: false, Message: msg });
    });
     docs.route('/object/:id')
        .get(function(req, res) { // Read
            var msg = {
                description: 'This is a simple single record lookup.',
                endpoint: '[GET: ' + app.baseUrl + '/api/object/:id]',
                CRUDI: 'Read',
                getParameters: {
                    id: { required: true, type: 'integer', sample: 2080 }
                }
            };
            res.json({ Error: false, Message: msg });
        })
        .put(function(req, res, next) { // Update
            var msg = {
                description: 'This Updates a single record. All body parameters are optional and only the data provided is changed. If nothing is provided only the modified date is updated.',
                endpoint: '[PUT: ' + app.baseUrl + '/api/object/:id]',
                CRUDI: 'Update',
                getParameters: {
                    id: { required: true, type: 'integer', sample: 2080 }
                },
                postBodyParameters: {
                    param1:  { required: false, type: 'integer', sample: 45301 },
                    param2:   { required: false, type: 'string',  sample: 'Example string' },
                }
            };
            res.json({ Error: false, Message: msg });
        })
        .delete(function(req, res, next) { // Delete
            var msg = {
                description: 'This is a simple single record delete method.',
                endpoint: '[DELETE: ' + app.baseUrl + '/api/object/:id]',
                CRUDI: 'Delete',
                getParameters: {
                    id: { required: true, type: 'integer', sample: 2080 }
                }
            };
            res.json({ Error: false, Message: msg });
    });
    app.use('/docs', 
		// app.Auth, // disable auth check for docs routes
	docs); // all of our api routes will be prefixed with /api
}