var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var lodash = require('lodash');
var SECRET = require('../auth/secret').secret;

function tok (req, res, next) {

    var authHeader = lodash.get(req.headers, 'authorization') || '';
    var token = authHeader.substr('Bearer '.length);

    if (!token) {
        console.log('no token');
        return res.status(401).json(err('You must log in.'));
    }

    console.log('token', token);

    jwt.verify(token, SECRET, function (error, decoded) {
        if (error) {
            return res.status(401).json(err('You must log in.'));
        }

        req.decoded = decoded;
        console.log('decoded', decoded);
        next();
    })
}

function delay (req, res, next) {
    setTimeout(function () {
        next();
    }, 500);
}

function err (text) {
    return {error_message: text};
}

router.use('/', function (req, res, next) {

    if (Object.keys(req.body).length) {
        console.log('body: ', JSON.stringify(req.body, null, 2));
    }

    next();
});

router.get('/constants', function (req, res, next) {
    res.json(require('./json-constants'));
});

router.post('/auth', delay, function (req, res, next) {
    var user;
    var token;

    if (req.body.password !== 'password') {
        return res.status(401)
           .json(require('./json-login-fail'));
    }

    user = require('./json-user').result;

    token = jwt.sign(user, SECRET, {expiresIn: '2m'});

    res.header('Authorization', token);
    res.json(
        lodash.assign({
            'token': token
        }, require('./json-login'))
    );
});

router.post('/logout', delay, function (req, res, next) {
    res.status(200).send();
});

router.post('/user', delay, function (req, res, next) {
    res.json(require('./json-user'));
});

router.post('/validate-email', delay, tok, function (req, res, next) {
    if (req.body.code === 'asdf') {
        res.json(require('./json-user'));
    } else {
        res.status(401).json(err('validate email fail'));
    }
});

router.put('/user', tok, function (req, res, next) {
    res.json(require('./json-user'));
});

router.get('/user', tok, function (req, res, next) {
    res.json(require('./json-user'));
});

router.get('/geo', function (req, res) {
    res.json(require('./json-geo'));
});

router.get('/state', function (req, res) {
    res.json(require('./json-state'));
});

router.get('/property/:id', function (req, res) {
    res.json(require('./json-property'));
});

router.put('/property/:id', function (req, res) {
    res.json(require('./json-property'));
});


router.get('/search_property', function (req, res) {
    res.json(require('./json-property-array'));
});

router.get('/property', function (req, res) {
    res.json(require('./json-property-array'));
});

router.get('/search_property', function (req, res) {
    res.json(require('./json-property-array'));
});

/* default */
// router.use('/', function(req, res, next) {
//   res.json({
//     'result': {id: 1},
//     'results': []
//   })
// });


module.exports = router;
