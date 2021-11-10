// Include packages needed for this application
const fs = require('fs');
const inq = require('inquirer');
const playwright = require('playwright');
const generateMarkdown = require('./utils/generateMarkdown');

// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Please enter your email address:',
        name: 'email',
        validate: (email) => {
            // Regex mail check (return true if valid mail)
            if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)) {
                return true;
            } else {
                return 'You should enter a valid email address';
            }
        }
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
        message: 'Enter the installation instructions:',
        default: 'npm i'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Enter the test instructions:',
        default: 'npm test'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter the information on how to use this project:'
    },
    {
        type: 'input',
        name: 'guidelines',
        message: 'Enter the contribution guidelines:'
    },
    {
        type: 'input',
        message: 'Enter the deployed URL for the live site:',
        name: 'uri',
        validate: (uri) => {
            if (!uri) { return true; }
            if (/(ftp|https?):\/\/[^ "]+$/.test(uri)) {
                return true;
            } else {
                return 'You should enter a valid URL';
            }
        }
    }
];

// Create a function to write README file
const writeFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', data, err => {
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
        // Run parallel browser requests, wait until both complete
        await Promise.all([
            // Grab page screen shot using browser
            (async()=>{
                const chrome = await playwright.chromium.launch();
                const chromePage = await chrome.newPage();
                await chromePage.goto(uri);
                await chromePage.screenshot({path: 'dist/images/chrome-page.png'});
                await chrome.close();
            })(),
            // Grab page screen shot using mobile browser
            (async()=>{
                const iPhone11 = playwright['iPhone 11 Pro'];
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
                await phonePage.screenshot({path: 'dist/images/phone-page.png'});
                await phone.close();
            })()
        ]);

        return {browser:{path:'chrome-page.png'}, mobile:{path:'phone-page.png'}, uri:uri};
    } catch (err) {
        return err;
    }
};

// Create a function to initialize app
async function init() {
    try {
        // create output directories
        const dist = './dist';
        const images = './dist/images/';
        if (!fs.existsSync(dist)) {
            fs.mkdirSync(dist);
        }
        if (!fs.existsSync(images)) {
            fs.mkdirSync(images);
        }
        const answers = await inq.prompt(questions);
        if (answers.uri) { createScreenCapture(answers.uri); }
        return await writeFile(await generateMarkdown(answers));
    } catch (err) {
        console.log(err);
    }
}

// Function call to initialize app
init();
