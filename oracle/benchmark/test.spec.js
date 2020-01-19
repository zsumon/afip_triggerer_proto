const oracledb = require('oracledb');
const dbConfig = require('../dbconfig.js');
const now = require('performance-now');

const allInvoices = [];

async function run() {

    let connection;

    try {
        // Get a non-pooled connection
        connection = await oracledb.getConnection(dbConfig);
        console.log('Connection was successful!');

        for (let i = 0; i < 100; i++) {
                
        }

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

        // TODO:
        // const result = await connection.execute(
        //     `INSERT INTO AFIP.PATIENT_INFO VALUES
        //     (:invoice_id,:hospital_id,:patient_name,:patient_phone,:patient_gender,:patient_age',:reffered_by,:specimen,:date_receive,:date_delivery,:bm_number,:available_tests,:patient_email)`,
        //     [invoice_id, 'afip', patient_name, patient_gender, patient_age, 'Self', 'Blood', null, null, 'bm_123', null, patient_email],
        //     { autoCommit: true });

        //  console.log(rres);
        await insertReport(conn, invoice_id);
        //allInvoices.push(invoice_id);
    }
}

async function insertReport(conn, invoiceId) {
    const report_id = 'R' + makeid(6);
    const test_type = "TSH";
    const test_result = "1.06,2.80,3.85";

    const result = await connection.execute(
        `INSERT INTO upload_logs VALUES (:invoice_id, :report_id, :upload_date)`,
        [invoice_id, report_id, null],
        { autoCommit: true });
    // console.log(sql);
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