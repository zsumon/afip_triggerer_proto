const admin = require('firebase-admin');
const serviceAccount = require("C:/firebase-key/emed-4490e-firebase-adminsdk-g3lrc-e9f980ad44.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://emed-4490e.firebaseio.com",
    storageBucket: "emed-4490e.appspot.com"
});

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


async function uploadReport(postData, pdfPath, fileSize) {

    const patientPhone = "+88" + postData.patient_phone;
    const user = await getOrCreateUser(patientPhone);

    // console.log('User is: =>', user);
    const fileRef = db.collection('files').doc();
    // console.log(filesRef.id);
    const fileUrl = await uploadFile(pdfPath);

    const fileData = {
        'file_creation_date': admin.firestore.Timestamp.now(),
        'file_size': fileSize,
        'file_type': 'pdf',
        'associated_patientId': user.uid,
        'file_id': fileRef.id,
        'file_url': fileUrl,
        'file_name': postData.invoice_id + "_" + postData.test_type + ".pdf",
        'associated_hospitalId': 'bPL8ydaOUPQLLAeuARyN9Otgnel2',
        'associated_patient_phone': patientPhone,
        'test_type': postData.test_type,
        'test_result': postData.test_result
    };

    const resp = await fileRef.set(fileData);
    // console.log(resp);

    // notify android users..

    console.log('full report upload success');
}


async function notifyAndroidUsers(token) {

}

async function getOrCreateUser(phone) {
    // const users = await auth.listUsers();
    // console.log(users);

    const user = await auth.getUserByPhoneNumber(phone);
    if (user) return user;
    //crete new user..
    return await auth.createUser({ phoneNumber: phone });
}

async function uploadFile(fullFilePath) {
    const bucket = storage.bucket();
    try {
        // https://mzmuse.com/blog/how-to-upload-to-firebase-storage-in-node
        const resp = await bucket.upload(fullFilePath, {
            public: true, metadata: { contentType: 'application/pdf', cacheControl: "public, max-age=300" }
        });
        // console.log('upload success: => ', resp.metadata.mediaLink);
        const fileUrl = resp['0'].metadata.mediaLink; // workaround hack..needs a check in production
        // console.log('uploaded file url: ' + fileUrl);
        return fileUrl;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// uploadFile('test.txt');

module.exports = { uploadReport };