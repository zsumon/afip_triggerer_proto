const oracledb = require('oracledb');
const dbConfig = require('../oracle/dbconfig');

async function uploadLog(invoice_id, report_id, upload_date) {
    let connection;
    try {
        // Get a non-pooled connection
        connection = await oracledb.getConnection(dbConfig);

        const sql = `INSERT INTO UPLOAD_LOGS(invoice_id,report_id,upload_date) VALUES('${invoice_id}','${report_id}',${upload_date})`;
        // console.log(sql);

        try {
            result = await connection.execute(
                `INSERT INTO upload_logs VALUES (:invoice_id, :report_id, :uploadd_date)`,
                [invoice_id, report_id, null],
                { autoCommit: true });
            console.log("log: success ", result.rowsAffected);
        } catch (error) {
            console.log(error);
        }

        // const stmts = [];
        // for (const s of stmts) {
        //     try {
        //         await connection.execute(s);
        //     } catch (e) {
        //         if (e.errorNum != 942)
        //             console.error(e);
        //     }
        // }

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

module.exports = { uploadLog };