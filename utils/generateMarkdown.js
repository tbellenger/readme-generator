// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  return 'badge';
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  return 'link';
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  return `## License
${renderLicenseBadge(license)} ${renderLicenseLink(license)}
  `
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
${data.description}

## Table of Contents
1. Installation
2. Usage
3. License
4. Contributing
5. Tests
6. Questions

## Installation
${data.install}

## Usage
${data.usage}

${renderLicenseSection(data.license)}

## Contributing
${data.username}

`;
}

module.exports = generateMarkdown;
