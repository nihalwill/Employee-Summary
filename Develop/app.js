const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const teamListOutput = path.resolve(__dirname, "output");
const teamFinalFile = path.join(teamListOutput, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const emptyId = [];

const questionsEmployee = [
    {
        type: "input",
        name: "nameManager",
        message: "Manager Name: "
    },
    {
        type: "input",
        name: "managerId",
        message: "Manager ID: "
    },
    {
        type: "input",
        name: "emailManager",
        message: "Manager Email: "
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Manager Office Phone Number: "
    }
];


function manager() {
    console.log("Processing information to generate web page");
    inquirer.prompt(questionsEmployee).then(function(data){
        const manager = new Manager(data.nameManager, data.managerId, data.emailManager, data.officeNumber);
        teamMembers.push(manager);
        emptyId.push(data.managerId);
        
        team();
    });
};

function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Select another team member to add: ",
            choices: [
                "Engineer",
                "Intern",
                "Manager",
                "NONE"
            ]
        }
    ]).then(function(data){
        if (data.memberChoice === "Engineer"){
            engineer();
        } else if (data.memberChoice === "Intern"){
            intern();
        } else if (data.memberChoice === "Manager"){
            manager();
        } 
        else (outputTeam());
    });
};

function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name:"engineerName",
            message: "Engineer Name: "
        },
        {
            type: "input",
            name:"engineerId",
            message: "Engineer ID: "
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Engineer Email: "
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "Engineer GitHub Username: "
        }
    ]). then(function(data){
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
        teamMembers.push(engineer);
        emptyId.push(data.engineerId);
        team();
    });
};

function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "Intern Name: "
        },
        {
            type: "input",
            name: "internId",
            message: "Intern ID: "
        },
        {
            type: "input",
            name: "internEmail",
            message: "Intern Email: "
        },
        {
            type: "input",
            name: "internSchool",
            message: "Intern's School: "
        }
    ]). then(function(data){
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        teamMembers.push(intern);
        emptyId.push(data.internId);
        team();
    });
};

function outputTeam() {
    if (!fs.existsSync(teamListOutput)) {
        fs.mkdirSync(teamListOutput)
    }
    fs.writeFileSync(teamFinalFile, render(teamMembers), "utf-8");
    console.log('New team.html file created in the "output" folder');

}

manager();

