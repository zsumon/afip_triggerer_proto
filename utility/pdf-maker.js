var fs = require('fs');
const path = require('path');
var conversion = require("phantom-html-to-pdf")(); // beautiful very high performant, not like dummy html-pdf  
const htmlMaker = require('./html-maker');
const firestoreHelper = require('../firestore/firestore-helper.js');


async function makePDFromHTML(postData) {
    const invoiceId = postData.invoice_id, reportType = postData.test_type, testResult = postData.test_result;
    // make html first then pdf..
    await htmlMaker.makeHtml(postData);

    const htmlFilePath = path.join(__dirname, "../all-generated-reports/html-reports/" + invoiceId + "_" + reportType + ".html");
    const html = fs.readFileSync(htmlFilePath, 'utf8');
    const outputPDFFilePath = path.join(__dirname, "../all-generated-reports/pdf-reports/" + invoiceId + "_" + reportType + ".pdf");

    conversion({
        html: html,
        paperSize: {
            /*format: 'A4',
            orientation: 'portrait',
            margin: {bottom: '0cm', left: '0cm', right: '0cm', top: '0cm'},
            headerHeight: '0cm', footerHeight: '0cm'*/
            margin: '0cm',
            headerHeight: '0cm',
            footerHeight: '0cm',
            format: 'A4'
        },
    }, async function (err, pdf) {
        const outputPdfStream = fs.createWriteStream(outputPDFFilePath);
        pdf.stream.pipe(outputPdfStream);

        if (err) console.log('failed' + '=>' + err);
        else console.log('pdf making success');

        const pdfLoc = 'all-generated-reports/pdf-reports/' + invoiceId + '_' + reportType + '.pdf';
        const htmlLoc = 'all-generated-reports/html-reports/' + invoiceId + '_' + reportType + '.html';

        await firestoreHelper.uploadReport(postData, pdfLoc, htmlLoc);
    });
}


module.exports = { makePDFromHTML };