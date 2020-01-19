const oracledb = require('oracledb');
const dbConfig = require('../oracle/dbconfig');

async function uploadLog(invoice_id, report_id, upload_date) {
    let connection;
    try {
        // Get a non-pooled connection
        connection = await oracledb.getConnection(dbConfig);

        // const sql = `INSERT INTO UPLOAD_LOGS(invoice_id,report_id,upload_date) VALUES('${invoice_id}','${report_id}',${upload_date})`;
        // console.log(sql);

        try {
            result = await connection.execute(
                `INSERT INTO upload_logs VALUES (:invoice_id, :report_id, :upload_date)`,
                [invoice_id, report_id, null],
                { autoCommit: true });
            // console.log("log: success ", result.rowsAffected);
        } catch (error) {
            console.log(error);
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

async function getLogsData(date) {
    if (date == null) {
        // return all
        let connection;
        try {
            // Get a non-pooled connection
            connection = await oracledb.getConnection(dbConfig);
            const sql = `SELECT * FROM UPLOAD_LOGS`;
            try {
                const result = await connection.execute(sql);
                // console.log(result.rows[0]);
                return result.rows;
            } catch (error) {
                console.log(error);
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
}

module.exports = { uploadLog, getLogsData };