var fs = require('fs');
var pdf = require('html-pdf');
const path = require('path');
const htmkMaker = require('./html-maker');

async function makePDFromHTML(voucherId, reportType) {
    // makae html first then pdf..
    await htmkMaker.makeHtml(voucherId, reportType);

    const htmlFilePath = path.join(__dirname, "../all-generated-reports/html-reports/" + voucherId + "_" + reportType + ".html");
    const html = fs.readFileSync(htmlFilePath, 'utf8');

    const outputPDFFilePath = path.join(__dirname, "../all-generated-reports/pdf-reports/" + voucherId + "_" + reportType + ".pdf");

    const options = { format: 'A4' };
    pdf.create(html, options).toFile(outputPDFFilePath, function (err, res) {
        if (err) return console.log(err);
        // console.log(res);
    });
}

// var phantom = require('phantom');

// phantom.create().then(function (ph) {
//     ph.createPage().then(function (page) {
//         page.open("http://localhost:7700/htmlfile").then(function (status) {
//             page.render('google.pdf').then(function () {
//                 console.log('Page Rendered');
//                 ph.exit();
//             });
//         });
//     });
// });


module.exports = { makePDFromHTML };