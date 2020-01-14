const express = require("express");
const bodyParser = require("body-parser");

const myOracle = require('./oracle/hospital-db-helper');
const PORT = process.env.PORT || 9988;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/report_updated', function (req, res) {

    console.log('new report updated:', req.body);
    const voucherId = req.body.voucher_id;
    // console.log(voucherId);
    res.send('success');
});

app.listen(PORT, function () {
    console.log("Started on PORT: " + PORT);
});

myOracle.run();