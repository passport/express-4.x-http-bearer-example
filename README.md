This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users via the HTTP Bearer
scheme.  Use this example as a starting point for your own web applications.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone git@github.com:passport/express-4.x-http-bearer-example.git
$ cd express-4.x-http-bearer-example
$ npm install
```

Start the server.

```bash
$ npm start
```
or
```bash
$ node server.js
```

Use `curl` to send an authenticated request.

```bash
$ curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
```
or
```bash
$ curl -v 'http://127.0.0.1:3000/?access_token=abcdefghi'
```