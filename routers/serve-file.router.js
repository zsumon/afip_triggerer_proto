const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.json());
router.unsubscribe()

router.get('/', async (req, res) => {
    // localhost:7700/serve-file/
    path.join(__dirname, 'fileName.html');
    const reqBody = req.body;
    // console.log(req.body);
    res.send('404');
});

module.exports = { router };

// well be using ejs render instead of serving and rendering report templates...