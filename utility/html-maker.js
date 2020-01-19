const util = require('util');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

//promisify
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function makeHtml(reqBody) {

    const voucherId = reqBody.invoice_id, reportType = reqBody.test_type, testResult = reqBody.test_result;
    const outputFilePath = path.join(__dirname, "../all-generated-reports/html-reports/" + voucherId + "_" + reportType + ".html");

    await mkdir(path.join(__dirname, "../all-generated-reports/html-reports/"), { recursive: true });
    await mkdir(path.join(__dirname, "../all-generated-reports/pdf-reports/"), { recursive: true });

    // const html = await ejs.renderFile(reportTemplateLocation, { name: voucherId }, { model: false }).then(output => output);
    //create file and write html
    await handleEachReportTpe(reqBody, outputFilePath);
}

async function handleEachReportTpe(reqBody, outputFilePath) {
    const reportType = reqBody.test_type;
    const templateLocation = path.join(__dirname, './report-template/' + reportType + '.ejs');
    //if (reportType === 'TSH') {
    const vals = reqBody.test_result.split(',');
    // console.log('vals: =>', vals);

    const date1 = (new Date()).toLocaleDateString("en-US");
    const date2 = (new Date()).toLocaleDateString("en-US");

    const html = await ejs.renderFile
        (templateLocation, {
            patName: reqBody.patient_name, invoiceId: reqBody.invoice_id, patPhone: reqBody.patient_phone, dateRec: date1, dateDel: date2,
            patEmail: reqBody.patient_email, patAge: reqBody.patient_age, refBy: 'Self', patGender: reqBody.patient_gender, val1: vals[0], val2: vals[1], val3: vals[2],
            val4: vals[3], val5: vals[4], val6: vals[5], val7: vals[6], val8: vals[7], val9: vals[8], val10: vals[9],
        }, { model: false }
        ).then(output => output);

    try {
        await writeFile(outputFilePath, html, "utf8");
        // console.log('success! ', 'tsh data injected');
        // success 
    } catch (error) {
        console.log(error);
        throw error;
    }
    // } else if (reportType === 'BILIRUBIN') {

    // }
}

module.exports = { makeHtml };