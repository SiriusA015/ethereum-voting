const router = require('express').Router();
let User = require('../models/user-model');

router.route('/').get((req, res) => {
    User.find({}, (err, user) => {
        if(err) {
            res.status(400).json('Error: '+err);
        }else {
            res.json(user);
        }
    });
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save((err) => {
        if(err) {
            res.status(400).json('Error: '+err);
        }else {
            res.json('User added!');
        }
    });
});

module.exports = router;