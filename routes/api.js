var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var lodash = require('lodash');
var SECRET = require('../auth/secret').secret;

function tok (req, res, next) {

    var authHeader = lodash.get(req.headers, 'authorization') || '';
    // var token = authHeader.substr('Bearer '.length);
    var token = authHeader;

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
    });
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

router.post('/auth', delay, function (req, res, next) {
    var user;
    var token;

    if (req.body.password !== 'buyer' && req.body.password !== 'agent') {
        return res.status(401)
           .json(require('./json-login-fail'));
    }

    user = lodash.assign({
        ui: 1,
        ut: req.body.password,
        action: {
            'profile': true
        }
    }, require('./json-user').result);

    token = jwt.sign(user, SECRET, {expiresIn: '20m'});

    res.header('Authorization', token);
    res.json(
        lodash.assign({
            'jwt': token,
            'flash_message': 'Welcome!'
        }, require('./json-login'))
    );
});


router.get('/constants', function (req, res, next) {
    res.json(require('./json-constants'));
});

router.get('/geo', function (req, res) {
    res.json(require('./json-geo'));
});

router.get('/state', function (req, res) {
    res.json(require('./json-state'));
});

router.post('/user', delay, function (req, res, next) {
    res.json(require('./json-user'));
});

router.put('/user/:id', delay, tok, function (req, res, next) {
    res.json(require('./json-user'));
});

router.get('/user/:id', tok, function (req, res, next) {
    res.json(require('./json-user'));
});

router.post('/user/:id/validate-email', delay, tok, function (req, res, next) {
    if (req.body.code === 'asdf') {
        res.json(lodash.assign({
            message: 'validated!'
        }, require('./json-user')));
    } else {
        res.status(400).json(err('validate email fail'));
    }
});

router.post('/user/:id/re-validate-email', delay, tok, function (req, res, next) {
        res.json(require('./json-user'));
});

router.get('/user/:id/actions', tok, function (req, res, next) {
    // for action, see https://design.google.com/icons/
    res.json({
        'results': [
            {
                'action': 'profile',
                'text': 'Update your profile to get most accurate results.',
            }, {
                'action': 'validate',
                'text': 'Validate your email address.',
            }, {
                'action': 'property',
                'text': 'There are 2 new properties on the market.',
            }, {
                'action': 'trending_up',
                'text': '731 Lexington has an increased price!',
                'path': '/property/1',
            }, {
                'action': 'trending_down',
                'text': '731 Lexington has a markdown price!',
                'path': '/property/1',
            }
        ]
    });
});

router.get('/property/:id', function (req, res) {
    res.json(require('./json-property'));
});

router.post('/property', delay, tok, function (req, res) {
    res.json(require('./json-property'));
});

router.put('/property/:id', delay, tok, function (req, res) {
    res.json(require('./json-property'));
});

router.get('/search_property', function (req, res) {
    res.json(require('./json-property-array'));
});

router.get('/property', function (req, res) {
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
