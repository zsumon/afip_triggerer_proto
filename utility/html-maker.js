const util = require('util');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

//promisify
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function makeHtml(postData) {
    try {
        //  await makeOutputDirFirst();
        const voucherId = postData.invoice_id, reportType = postData.test_type, testResult = postData.test_result;
        const outputFilePath = path.join(__dirname, "../all-generated-reports/html-reports/" + voucherId + "_" + reportType + ".html");
        const reportTemplateLocation = path.join(__dirname, './report-template/default.ejs');
        console.log(reportTemplateLocation);
        // await mkdir("./all-generated-reports/");
        await mkdir(path.join(__dirname, "../all-generated-reports/html-reports/"), { recursive: true });
        await mkdir(path.join(__dirname, "../all-generated-reports/html-reports/"), { recursive: true });

        const html = await ejs.renderFile(reportTemplateLocation, { name: voucherId }, { model: false }).then(output => output);
        //create file and write html
        await writeFile(outputFilePath, html, "utf8");
        // console.log('Made HTML');
    } catch (error) {
        console.log(error);
    }
}

async function makeOutputDirFirst() {
    try {
        console.log('making dirs...');

        await mkdir("./all-generated-reports/");
        await mkdir("./all-generated-reports/html-reports/", { recursive: true });
        await mkdir("./all-generated-reports/pdf-reports/", { recursive: true }); //also ensures pdf file location  
        console.log('all dir ok');

    } catch (error) {
        console.log('cant: ', error);

    }
}

module.exports = { makeHtml };