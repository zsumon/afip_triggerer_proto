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

        await insertPatients(connection, 2);

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

        // TODO: file size & bulk  
        // const sql = `INSERT INTO AFIP.PATIENT_INFO(:invoice_id,:hospital_id,:patient_name,:patient_phone,:patient_gender,:patient_age,:reffered_by,:specimen,:date_receive,:date_delivery,:bm_number,:available_tests,:patient_email) VALUES('${invoice_id}', 'afip', '${patient_name}', '${patient_gender}', '${patient_age}', 'Self', 'Blood', null, null, 'bm_123', null, '${patient_email}'],`
        const result = await conn.execute(
            `INSERT INTO AFIP.PATIENT_INFO VALUES (:invoice_id,:hospital_id,:patient_name,:patient_phone,:patient_gender,:patient_age,:reffered_by,:specimen,:date_receive,:date_delivery,:bm_number,:available_tests,:patient_email)`,
            [invoice_id, 'afip', patient_name, '0123', 'Male', '20', 'Self', 'null', 'null', 'null', 'bm_123', 'null', patient_email],
            { autoCommit: true });


        // const sql = `INSERT INTO PATIENT_INFO VALUES (invoice_id,hospital_id,patient_name,patient_phone,patient_gender,:patient_age,:reffered_by,:specimen,:date_receive,:date_delivery,:bm_number,:available_tests,:patient_email)`,

        console.log(result);
        await insertReport(conn, invoice_id);

    }
}

async function insertReport(connection, invoice_id) {
    const report_id = 'R' + makeid(6);
    const test_type = "TSH";
    const test_result = "1.06,2.80,3.85";

    const result = await connection.execute(
        `INSERT INTO AFIP.tsh VALUES (:invoice_id, :report_id, :upload_date)`,
        [report_id, invoice_id, null],
        { autoCommit: true });
    console.log(result);
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