This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users via the HTTP Bearer
scheme.  Use this example as a starting point for your own web applications.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone https://github.com/passport/express-4.x-http-bearer-example.git
$ cd express-4.x-http-bearer-example
$ npm install
```

Start the server.

```bash
$ node server.js
```

Use `curl` to send an authenticated request.

```bash
$ curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
```

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/passport/express-4.x-http-bearer-example'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/passport/express-4.x-http-bearer-example.svg' /></a>
