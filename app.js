const fs = require('fs');
const helpers = require('./helpers');
const mailer = require('./mailer');

const getDay = new Date().getDay();
// Send email on Monday using Saturday's data
if (getDay === 1) { mailer.sendEmail() } 

helpers.getData((error, data) => {
    helpers.filterData(data, (error, data) => {
        // Save employees, except on Sunday and Monday
        if (getDay !== 0 || getDay !== 1) { fs.writeFileSync('./data.json', JSON.stringify(data)) }
        // Send emails Tuesday thru Friday
        if (getDay > 1 && getDay < 6) { mailer.sendEmail() }
    });
});