const admin = require('firebase-admin');
const serviceAccount = require("C:/firebase-key/emed-4490e-firebase-adminsdk-g3lrc-e9f980ad44.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://emed-4490e.firebaseio.com",
    storageBucket: "emed-4490e.appspot.com"
});

const path = require('path');
const mime = require('mime');
const mailSender = require('../utility/mail-sender.js');
const logger = require('../upload-stat/stat-service.js');


const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();


async function getSample() {
    const query = db.collection('files').where('file_id', '==', 'l0XNikXmpccQGdzDoVmv');
    const querySnap = await query.get();
    querySnap.forEach((docSnap) => {
        const data = docSnap.data();
        // console.log(data); 
        for (const k of Object.keys(data)) {
            console.log('\'' + k + '\':\'\'');
        }
    });
}


async function uploadReport(postData, pdfPath, htmlPath) {
    const patientPhone = "+88" + postData.patient_phone;
    const patEmail = postData.patient_email;

    try {
        const user = await getOrCreateUser(patEmail);
        const fileRef = db.collection('files').doc();

        const fileUrl = await uploadFile(pdfPath);
        const fileUrlHtml = await uploadFile(htmlPath);

        console.log(fileUrlHtml + "\n" + fileUrl);
        // return;

        const fileData = {
            'file_creation_date': admin.firestore.Timestamp.now(),
            'file_type': 'pdf',
            'associated_patientId': user.uid,
            'file_id': fileRef.id,
            'file_url': fileUrl,
            'file_url_html': fileUrlHtml,
            'file_name': postData.invoice_id + "_" + postData.test_type + ".pdf",
            'associated_hospitalId': 'bPL8ydaOUPQLLAeuARyN9Otgnel2',
            'associated_patient_phone': patientPhone,
            'test_type': postData.test_type,
            'test_result': postData.test_result
        };
        const resp = await fileRef.set(fileData);
        console.log('added to /files');


        let mailBody = 'Dear patient!\nYour Report is ready, here are download links:\n';
        mailBody += fileUrl + '\n' + fileUrlHtml;
        await mailSender.sendEmailAsync(patEmail, 'New report is ready', mailBody);
        console.log('full report upload success :)');

        // add to LOGS
        await logger.uploadLog(postData.invoice_id, postData.report_id, null);

    } catch (error) {
        console.log(error);
    }
}

async function getOrCreateUser(email) {
    // const users = await auth.listUsers();
    // console.log(users);
    try {
        const user = await auth.getUserByEmail(email);
        if (user) return user;
    } catch (error) {

    } finally {
        return (await auth.createUser({ email: email, password: '123456' }));
    }
    //crete new user..
}

async function uploadFile(fullFilePath) {
    const bucket = storage.bucket();
    const uploadedName = path.basename(fullFilePath);

    let url = '';
    try {
        // https://mzmuse.com/blog/how-to-upload-to-firebase-storage-in-node
        const resp = await bucket.upload(fullFilePath, {
            public: true,
            destination: uploadedName,
            metadata: {
                contentType: mime.getType(fullFilePath),
                cacheControl: "public, max-age=84600"
            }
        });
        const fileUrl = resp['0'].metadata.mediaLink; // workaround hack..needs a check in production
        return `http://storage.googleapis.com/emed-4490e.appspot.com/${encodeURIComponent(uploadedName)}`;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { uploadReport };