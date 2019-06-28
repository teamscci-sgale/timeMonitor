const request = require('request');
const decoder = require('./decoder');
// Get employees with zero hours for previous workday
const getData = (query, callback) => {
    request({ url: decoder.url + query, json: true }, (error, { body }) => {
        callback(undefined, body.value.filter((result) => result.YesterdaysHours === '0.00'));
    });
}
// Reorder first and last name and remove comma, middle initial, and exempt employees
const filterData = (data, callback) => {
    const exempt = ["100001","100004","100104","101167","100775","101246","100770","100172","101297"];
    
    callback(undefined, data.filter((employee) => {
        employee.EmployeeName = ((employee.EmployeeName).split(', ')[1]).split(' ')[0] + ' ' + (employee.EmployeeName).split(', ')[0];
        employee.ReportsToName = ((employee.ReportsToName).split(', ')[1]).split(' ')[0] + ' ' + (employee.ReportsToName).split(', ')[0];

        if (exempt.indexOf(employee.EmployeeID) === -1) { return true }
        return false;
    }));
}
module.exports = { getData: getData, filterData: filterData, supervisorData: supervisorData }