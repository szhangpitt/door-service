var express = require('express');
var router = express.Router();


// router.get('/user', function (req, res, next) {
//     res.json({
//         'result': {
//             id: 1
//         }
//     });
// });

router.get('/constants', function (req, res, next) {
    res.json({
    'LOT_SIZE_UNIT': [{
            value: 'sqft',
            label: 'sqft'
        }, {
            value: 'acre',
            label: 'acre'
        }],
    'PROPERTY_TYPES': [{
            label: 'Condo',
            value: 'condo',
        }, {
            label: 'Single',
            value: 'single'
        }, {
            label: 'Semi',
            value: 'semi'
        }, {
            label: 'Town',
            value: 'town'
        }, {
            label: 'Co-op',
            value: 'co-op'
        }, {
            label: 'other',
            value: 'other'
        }],
    'PROPERTY_STATUS': [{
              value: 'open',
              label: 'Open'
          }, {
              value: 'initial',
              label: 'Initial'
          }]
    });
});


// router.post('/login', function (req, res, next) {
//     res.json({
//       "count": 1,
//       "start_element": 0,
//       "num_elements": 0,
//       "debug_info": {
//         "start_time": 1447937761078,
//         "duration": 118
//       }
//     });
// });


router.use('/user', function (req, res, next) {
    res.json({
      "result": {
        "id": 1,
        "email": "foo@bar.com",
        "type": "buyer",
        "interested_area": [
          {
            "area": "shanghai"
          }
        ],
        "interested_property_type": [
          {
            "property_type": "condo"
          },
          {
            "property_type": "sfh"
          }
        ],
        "interested_factor": [
          {
            "factor": "school"
          }
        ],
        "interest_time_to_buy": "month-12"
      },
      "count": 1,
      "debug_info": {
        "start_time": 1450254794088,
        "duration": 14
      }
    });
});

// router.post('/property', function (req, res, next) {
    
// })
// 
// 

/* GET users listing. */
router.use('/', function(req, res, next) {
  res.json({
    'result': {id: 1},
    'results': []
  })
});


module.exports = router;
