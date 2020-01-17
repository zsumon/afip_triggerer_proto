const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.json());


router.get('/', async (req, res) => {
    
    res.send('404');
});

module.exports = { router };

// well be using ejs render instead of serving and rendering report templates...