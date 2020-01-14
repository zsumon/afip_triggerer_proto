const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

async function run() {

    let connection;

    try {
        // Get a non-pooled connection
        connection = await oracledb.getConnection(dbConfig);
        console.log('Connection was successful!');

        // const dat = await connection.execute('SELECT * FROM REPORTS');
       // console.log(dat);
        

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

module.exports = { run };