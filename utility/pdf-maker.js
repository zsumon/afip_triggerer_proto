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
        //     margin: { left: '0cm', right: '0cm', top: '0cm' },
        // },
        //  zoom: .50,
        // paperSize: {
        //     width: '1500px',
        //     height: '1700px',
        //     margin: '0cm'
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
// same stylling issues...

// var phantom = require('phantom');
// phantom.create().then(function (ph) {
//     ph.createPage().then(function (page) {
//         page.open("http://127.0.0.1:54333/me.html").then(function (status) {

//             page.render('google.pdf', paperSize = {
//                 width: '5in',
//                 height: '7in',
//                 margin: {
//                     top: '100px',
//                     left: '-200px'
//                 }
//             }).then(function () {
//                 console.log('Page Rendered');
//                 ph.exit();
//             });
//         });
//     });
// });



module.exports = { makePDFromHTML };