const router = require('express').Router();
const Movie = require('../model/Movie.model');
const verify = require('../verifyToken');

//CREATE MOVIE
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('you are not allowed!');
    }
});

//UPDATE MOVIES
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updateMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.json(403).json('you are not allowed ')
    }
});

//DELETE MOVIES FROM
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.body);
            res.status(200).json('movie has been deleted.....');
        } catch (err) {
            res.status(500).json('Movie hasbeen deleted successfully');
        }
    } else {
        return res.json(403).json('you are not allowed ');
    }
});

//GET MOVIES 
router.get('/find/:id', verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(403).json(err);
    }
});

//GET RANDOM
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL MOVIES
router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movie = await Movie.find();
            res.status(200).json(movie.reverse());
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('you are not allowed');
    }
});

module.exports = router;