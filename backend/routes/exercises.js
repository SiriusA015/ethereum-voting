const router = require('express').Router();
let Exercise = require('../models/exercise-model');

router.route('/').get((req, res) => {
    Exercise.find({}, (err, exercise) => {
        if(err) {
            res.status(400).json('Error: '+err);
        }else {
            console.log(exercise);
            res.json(exercise);
        }
    });
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save((err) => {
        if(err) {
            res.status(400).json('Error: '+err);
        }else {
            res.json('Exercise added!');
        }
    });
});

router.route('/:id').get((req, res) => {
    Exercise.findById((req.params.id), (err, exercise) => {
        if(err) {
            res.status(400).json('Error: '+err);
        }else {
            res.json(exercise);
        }
    });
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete((req.params.id), (err) => {
        if(err) {
            res.status(400).json('Error: '+err);
        }else {
            res.json('Exercise deleted');
        }
    });
});

router.route('/update/:id').post((req,res) => {
    Exercise.findById((req.paramas.id), (err, exercise) => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save();
    });
});

module.exports = router;