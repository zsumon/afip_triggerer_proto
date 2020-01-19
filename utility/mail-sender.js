const sendEmailAsync = async (toUser, subject, text) => {
    var send = require('gmail-send')({
        user: 'emed.uploader@gmail.com',
        pass: 'emed123456',
        to: toUser,
        subject: subject,
        text: text,
        //html:
    });
    try {
        const res = await send(); // Using default parameters
        // console.log('res.result:', res.result);
        // uncomment to see full response from Nodemailer:
        // console.log('* [promise-example-2] res.full:', res.full);
        console.log('Sent to: ' + toUser);
    } catch (e) {
        console.error('ERROR:', e);
        throw e;
    }
};

module.exports = { sendEmailAsync };