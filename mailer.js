const fs = require('fs');
const nodemailer = require('nodemailer');
const decoder = require('./decoder');

const sendEmail = () => {
    // SMTP configuration for the Exchange server
    const transporter = nodemailer.createTransport({
        host: decoder.smtpServer,
        port: 25,
        secure: false,
        tls: { rejectUnauthorized: false }
    });
    // Load employees from data.json
    const dataBuffer = fs.readFileSync('data.json');
    const data = JSON.parse(dataBuffer.toString());
    
    data.forEach((employee) => {
        // Send email to each user 
        const message = {
            from: decoder.from,
            to: employee.Email,
            subject: 'REMINDER: Update your time sheet no later than 10AM today',
            html: '<style>p {font-family: tahoma; font-size: 13px; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}</style><p>' + employee.EmployeeName + ',</p><br><p>SCCI policy is to have daily time sheets updated by the end of each work day and no later than 10AM local time the following day.</p><br><p>For further information and exceptions to the policy see Policy #E-501, Employee Weekly Time Sheet, from the Employee Handbook or the JAMIS Prime ERP Time Card & Time Off Guidelines and Procedures found on the Dashboard in JAMIS.</p><br><p>For access to JAMIS to complete your time sheet go to <a href="https://scci.jamisprime.com">JAMIS Prime</a>.</p><br><p>Thank you,</p><p>Ed Jackson</p>',
            priority: 'high'
        }
        transporter.sendMail(message);
    });
}
module.exports = { sendEmail: sendEmail };