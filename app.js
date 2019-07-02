const helpers = require('./helpers');

const numDay = new Date().getDay();
const hours = new Date().getHours();
const timeZone = ['EST','CST','MST','PST'];

// The default query is TimeCardMonitoring2, but on Mondays it's TimeCardMonitoring3
const query = numDay === 1 ? 'TimeCardMonitoring3' : 'TimeCardMonitoring2';

// Only run Monday thru Friday
if ((numDay > 0 && numDay < 6) && (hours > 8 && hours < 13)) {
    helpers.getData(query, (error, data) => {
        helpers.filterData(data, (error, data) => {
            helpers.prepData(data, timeZone[hours - 9]);
        });
    });
};

// helpers.testData(query);