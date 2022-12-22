const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', (req, res) => {
    Course.find()
        .then(courses => res.status(200).json(courses))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Saves the Course title and its link to the DB using POST request
router.post('/', (req, res) => {
    // console.log(req.body);
    const course = new Course({
        title: req.body.title,
        link: req.body.link
    })
    course.save().then((data) => res.status(200).json(data))
});

//Deletes the course from the DB using DELETE request and the course id
router.delete('/:id', (req, res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('Course Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Updating the course title and link using Patch request and the course id

router.patch('/:id', (req, res) => {
    Course.findByIdAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, link: req.body.link } }).then(() => res.status(200).json('Course Updated')).catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
