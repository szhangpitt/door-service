var express = require('express');
var router = express.Router();


var authed = false;


function bouncer (req, res, next) {
    if (req.path !== '/login' && !authed) {
        console.log('bouncing', req.path);
        res.status(401).json(err('You must log in.'));
    } else {
        next();
    }

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
    if (req.body.password !== 'password') {
        authed = false;
        res.status(401)
           .json(require('./json-login-fail'));
    } else {
        authed = true;
        res.json(require('./json-login'));
    }
});

router.post('/logout', delay, function (req, res, next) {
    authed = false;
    res.status(200).send();
});

router.post('/user', delay, function (req, res, next) {
    authed = true;
    res.json(require('./json-user'));
});

router.post('/validate-email', delay, bouncer, function (req, res, next) {
    if (req.body.code === 'asdf') {
        res.json(require('./json-user'));
    } else {
        res.status(401).json(err('validate email fail'));
    }
});

router.put('/user', bouncer, function (req, res, next) {
    res.json(require('./json-user'));
});

router.get('/user', bouncer, function (req, res, next) {
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

/* default */
// router.use('/', function(req, res, next) {
//   res.json({
//     'result': {id: 1},
//     'results': []
//   })
// });


module.exports = router;
