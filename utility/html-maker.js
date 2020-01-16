const util = require('util');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

//promisify
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function makeHtml(voucherId, reportType) {
    try {
        const outputFilePath = path.join(__dirname, "../all-generated-reports/html-reports/" + voucherId + "_" + reportType + ".html");
        const reportTemplateLocation = path.join(__dirname, './report-template/default.ejs');
        // console.log(reportTemplateLocation);

        const html = await ejs.renderFile(reportTemplateLocation, { model: false }).then(output => output);
        //create file and write html
        await writeFile(outputFilePath, html, "utf8");
        // console.log('Made HTML');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { makeHtml };