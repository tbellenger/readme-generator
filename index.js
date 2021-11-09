// TODO: Include packages needed for this application
const fs = require('fs');
const inq = require('inquirer');
const playwright = require('playwright');
//const generateReadme = require('./src/readmeGenerator');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Please enter your email address:',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Enter your github username:',
        name: 'username'
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter the project name:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a short description of your project:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'How is this project licensed:',
        choices: ['MIT License', 'GPL 3.0 License', 'Apache 2.0 License', 'BSD 3 License', 'None']
    },
    {
        type: 'input',
        name: 'install',
        message: 'Enter the installation instructions (default: "npm i"):',
        default: 'npm i'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Enter the test instructions (default: "npm test"):',
        default: 'npm test'
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
        message: 'Enter the url for the live site:',
        name: 'uri'
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

const createScreenCapture = async (uri) => {
    try {
        const iPhone11 = playwright['iPhone 11 Pro'];
        const chrome = await playwright.chromium.launch();
        const chromePage = await chrome.newPage();
        await chromePage.goto(uri);
        await chromePage.screenshot({path: 'dist/chrome-page.png'});
        const phone = await playwright.webkit.launch();
        const context = await phone.newContext({
            ...iPhone11,
            isMobile: true,
            viewport: {
                width: 414,
                height: 896
            }
        });
        const phonePage = await context.newPage();
        await phonePage.goto(uri);
        await phonePage.screenshot({path: 'dist/phone-page.png'});

        await chrome.close();
        await phone.close();
    } catch (err) {
        console.log(err);
    }
};

// TODO: Create a function to initialize app
function init() {
    
    createScreenCapture('https://tbellenger.github.io/playlist');


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
