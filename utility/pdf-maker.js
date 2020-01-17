var fs = require('fs');
const path = require('path');
var conversion = require("phantom-html-to-pdf")(); // beautiful very high performant, not like dummy html-pdf  
const htmkMaker = require('./html-maker');

async function makePDFromHTML(postData) {
    const voucherId = postData.invoice_id, reportType = postData.test_type, testResult = postData.test_result;

    // make html first then pdf..
    await htmkMaker.makeHtml(postData);

    const htmlFilePath = path.join(__dirname, "../all-generated-reports/html-reports/" + voucherId + "_" + reportType + ".html");
    const html = fs.readFileSync(htmlFilePath, 'utf8');
    const outputPDFFilePath = path.join(__dirname, "../all-generated-reports/pdf-reports/" + voucherId + "_" + reportType + ".pdf");
    // TODO --> Page size fix korte pare na

    conversion({
        html: html,
        // paperSize: {
        //     format: 'A4',
        //     orientation: 'portrait',
        //     margin: { bottom: '0cm', left: '0.0', right: '0.0cm', top: '0.0cm' },
        // },
        // paperSize: {
        //     width: '500px',
        //     height: '800px',
        //     margin: '0px'
        // }
    }, function (err, pdf) {
        const outputPdfStream = fs.createWriteStream(outputPDFFilePath);
        console.log(pdf.logs);
        //  console.log(pdf.numberOfPages);
        // since pdf.stream is a node.js stream you can use it
        // to save the pdf to a file (like in this example) or to
        // respond an http request.
        pdf.stream.pipe(outputPdfStream);
        if (err) console.log(failed + '=>' + err);

    });

}


// another way coluld be serving html file and then capturing with phantom js

var phantom = require('phantom');
phantom.create().then(function (ph) {
    ph.createPage().then(function (page) {
        page.open("https://dume-app.000webhostapp.com/tsh.html").then(function (status) {
            page.render('google.pdf').then(function () {
                console.log('Page Rendered');
                ph.exit();
            });
        });
    });
});



module.exports = { makePDFromHTML };