var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'ritesh@braintechnosys.com',
    pass: 'Admin@987#BMW'
    }
});

exports.sendRegisterMail = async (email) => {

    var mailOptions = {
        from: 'ritesh@braintechnosys.com',
        to: email,
        subject: 'Register Email using Node.js',
        html: '<h1>Welcome</h1><p>That was easy!</p>'
    };
    
    let response = await transporter.sendMail(mailOptions);
    console.log("Mail response", response);
    return response;
    
}
