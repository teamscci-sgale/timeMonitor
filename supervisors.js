const fs = require('fs');
const mailer = require('./mailer');

const emailSupervisor = () => {
    // Load employees from data.json
    const dataBuffer = fs.readFileSync('data.json');
    const data = JSON.parse(dataBuffer.toString());
    const id = [], supervisors = [], teams = [];

    // Pushes only ReportsToID on id[] and ReportsToID, ReportsToName, and ReportsToEmail on supervisors[]
    data.forEach(({ ReportsToID, ReportsToName, ReportsToEmail }) => {
        if (id.indexOf(ReportsToID) === -1) {
            id.push(ReportsToID);
            supervisors.push({ supervisor: { ReportsToID, ReportsToName, ReportsToEmail } });
        };
    });
    
    // Groups team members by supervisor and pushes both on teams[]
    supervisors.forEach(({ supervisor }) => {
        const members = [];

        data.filter(({ ReportsToID, EmployeeName }) => { 
            if (ReportsToID === supervisor.ReportsToID) { members.push(EmployeeName) }
        });

        teams.push({
            EmployeeName: supervisor.ReportsToName,
            Email: supervisor.ReportsToEmail,
            TeamMembers: members
        });
    });

    // Data is saved to teams.json specific to the time zone passed in, then the supervisor type is passed to sendEmail() 
    fs.writeFileSync('./teams.json', JSON.stringify(teams));
    mailer.sendEmail('supervisor', 'teams.json');
};

module.exports = { emailSupervisor: emailSupervisor };