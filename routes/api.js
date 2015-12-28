var express = require('express');
var router = express.Router();

router.get('/constants', function (req, res, next) {
    res.json(require('./json-constants'));
});


router.post('/login', function (req, res, next) {
    res.json(require('./json-login'));
});


router.use('/user', function (req, res, next) {
    res.json(require('./json-user'));
});


router.get('/geo', function (req, res) {
    res.json(require('./json-geo'));
});

router.get('/state', function (req, res) {
    res.json(require('./json-state'));
});

/* GET users listing. */
router.use('/', function(req, res, next) {
  res.json({
    'result': {id: 1},
    'results': []
  })
});


module.exports = router;
