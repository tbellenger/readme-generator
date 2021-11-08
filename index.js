// TODO: Include packages needed for this application
const fs = require('fs');
const inq = require('inquirer');
//const generateReadme = require('./src/readmeGenerator');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the project title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the description:'
    },
    {
        type: 'input',
        name: 'install',
        message: 'Enter the installation instructions:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter the usage information::'
    },
    {
        type: 'input',
        name: 'guidelines',
        message: 'Enter the contribution guidelines:'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Enter the test instructions:'
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'How is this project licensed:',
        choices: ['MIT License', 'GPL License', 'Apache License']
    },
    {
        type: 'input',
        message: 'Enter your github username:',
        name: 'username'
    },
    {
        type: 'input',
        message: 'Enter your email address:',
        name: 'email'
    }
];

// TODO: Create a function to write README file
const writeFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/readme.md', data, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File Created'
            });
        });
    });
}

// TODO: Create a function to initialize app
function init() {
    inq.prompt(questions)
    .then(answers => {
        console.log(answers);
        return generateMarkdown(answers);
    })
    .then(markdown => {
        console.log(markdown);
        return writeFile(markdown);
    })
    .catch(err => {
        console.log(err);
    })
}

// Function call to initialize app
init();
