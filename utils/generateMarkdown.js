// Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  return `![License Badge](https://img.shields.io/badge/license-${license.replace(' License','')}-green)`;
}

// Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const short = license.split(' ')[0];
  let licenseLink;
  if (short == 'MIT') licenseLink = 'https://mit-license.org/';
  if (short == 'GPL') licenseLink = 'https://www.gnu.org/licenses/gpl-3.0.en.html';
  if (short == 'Apache') licenseLink = 'https://www.apache.org/licenses/LICENSE-2.0.html';
  if (short == 'BSD') licenseLink = 'https://opensource.org/licenses/BSD-3-Clause';
  return licenseLink;
}

// Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (!license || license == 'None') return '';
  return `## License
[${license}](${renderLicenseLink(license)})
  `
}

// Render a section that displays the screenshots of the deployed site
function renderScreenShotSection(uri) {
  if (!uri) return '';
  return `### Screenshots
[Live Deployed Link](${uri})
### Mobile
![screen shot from mobile browser](images/phone-page.png)
### Browser
![screen shot from pc browser](images/chrome-page.png)
  `
}

// Render the Table of Contents
function renderToc(data) {
  let toc = '## Table of Contents\n';
  if (data.install) toc += '1. [Installation](#installation)\n';
  if (data.usage) toc += '1. [Usage](#usage)\n';
  if (data.uri) toc += '   1. [Screenshots](#screenshots)\n'
  if (data.license) toc += '1. [License](#license)\n';
  if (data.username) toc += '1. [Contributing](#contributing)\n';
  if (data.test) toc += '1. [Tests](#tests)\n';
  toc += '1. [Questions](#questions)\n';
  return toc;
}

// Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
${renderLicenseBadge(data.license)}

${data.description}

${renderToc(data)}

## Installation
${data.install}

## Usage
${data.usage}
${renderScreenShotSection(data.uri)}

${renderLicenseSection(data.license)}

## Contributing
${data.guidelines}

## Tests
${data.test}

## Questions
[Find me on Github](https://github.com/${data.username})

Or you can contact me at ${data.email} if you have any questions

`;
}

module.exports = generateMarkdown;
