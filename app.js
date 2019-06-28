const fs = require('fs');
const helpers = require('./helpers');
const mailer = require('./mailer');

let query = 'TimeCardMonitoring2';
if (new Date().getDay() === 1) { query = 'TimeCardMonitoring3' };

helpers.getData(query, (error, data) => {
    helpers.filterData(data, (error, data) => {
        fs.writeFileSync('./data.json', JSON.stringify(data));
        mailer.sendEmail();
    });
});