const express = require('express');
const router = express.Router();
const User = require('../models/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//new 
router.post('/new', (req, res, next) => {
  const user = new User({
    fullName: 'Sinan',
    age: 23
  });
  user.save((err, data) => {
    if(err)
      console.log(err);
    res.json(data);  
  });
});

module.exports = router;
