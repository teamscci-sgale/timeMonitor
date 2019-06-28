const helpers = require('./helpers');
const supervisors = require('./supervisors');

const numDay = new Date().getDay();

// The default query is TimeCardMonitoring2, but on Mondays it's TimeCardMonitoring3
let query = 'TimeCardMonitoring2';
if (numDay === 1) { query = 'TimeCardMonitoring3' }

// Only run Monday thru Friday
if (numDay > 0 || numDay < 6) {
    helpers.getData(query, (error, data) => {
        helpers.filterData(data, (error, data) => {

            // Based on the hour--currently running in CST--with a target of 10AM 
            // in each time zone:  data, time zone, and type are passed to prepData()
            switch (new Date().getHours()) {
                case 9: 
                        helpers.prepData(data, 'EST', 'employee', 'data.json');
                        break;
                case 10:
                        helpers.prepData(data, 'CST', 'employee', 'data.json');
                        break;
                case 11:
                        helpers.prepData(data, 'MST', 'employee', 'data.json');
                        break;
                case 12:
                        helpers.prepData(data, 'PST', 'employee', 'data.json');
                        break;
            }
            supervisors.emailSupervisor();
        });
    });
    
}

// helpers.testData(query);