const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const myOracle = require('./oracle/hospital-db-helper');
const pdfMaker = require('./utility/pdf-maker');

const app = express();
const PORT = process.env.PORT || 7700;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.post('/reports_updated', async function (req, res) {
    console.log('New report updated:', req.body);
    pdfMaker.makePDFromHTML(req.body.invoice_id, req.body.report_type);
    // we'll save it to local storage, cloud storage adn also get a cloud link of that file..
    res.send('success');
});

app.listen(PORT, function () {
    console.log("Started on PORT: " + PORT);
});

myOracle.run();