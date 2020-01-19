const express = require('express');
const router = express.Router();
const path = require('path');

const statService = require('../upload-stat/stat-service.js');

router.use(express.json());

const filePath = path.join(__dirname, '../upload-stat/stat.ejs');
router.get('/', async (req, res) => {
    // localhost:port/stat
    const data = await statService.getLogsData();
    res.render(filePath, { data });
});

module.exports = router;

// well be using ejs render instead of serving and rendering report templates...