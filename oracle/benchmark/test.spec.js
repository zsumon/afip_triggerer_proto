const oracledb = require('oracledb');
const dbConfig = require('../dbconfig.js');

const allInvoices = [];

async function run() {

    let connection;

    try {
        // Get a non-pooled connection
        connection = await oracledb.getConnection(dbConfig);
        console.log('Connection was successful!');

        await insertPatients(connection, 10);
        console.log('All Done');

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();

async function insertPatients(conn, number) {
    for (let i = 0; i < number; i++) {
        const invoice_id = 'V' + makeid(6);

        const report_id = 'R' + makeid(6);
        const test_type = "TSH";
        const test_result = "1.06,2.80,3.85";

        const patient_name = 'Mr. ' + makeid(8) + ' ' + makeid(4);
        const patient_age = parseInt(Math.floor(Math.random() * 10));
        const patient_gender = 'Male';
        const patient_phone = (Math.random() * 1000000).toString().substr(0, 11);
        const patient_email = makeid(10) + '@' + 'gmail.com';

        const sql = `INSERT INTO AFIP.PATIENT_INFO VALUES('${invoice_id}','AFIP','${patient_name}','${patient_phone}','${patient_gender}','${patient_age}','Self',null,null,null,null,null,'${patient_email}')`;
        // console.log(sql);

        const rres = await conn.execute(sql);

        //  console.log(rres);
        await insertReport(conn, invoice_id);
        //allInvoices.push(invoice_id);
    }

}

async function insertReport(conn, invoiceId) {
    const report_id = 'R' + makeid(6);
    const test_type = "TSH";
    const test_result = "1.06,2.80,3.85";
    const sql = `INSERT INTO AFIP.TSH VALUES('${report_id}','${invoiceId}','${test_result}')`;
    // console.log(sql);

    await conn.execute(sql);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}