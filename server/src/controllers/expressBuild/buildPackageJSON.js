const addAppInfo = appDetails => {
  let fileString = '';

  fileString += `"name": "${appDetails.appName}",\n` +
  `  "description": "${appDetails.github.description}",\n` +
  `  "author": "${appDetails.cookies.user}",\n`;

  return fileString;
};

const addGitDetails = appDetails => {
  let fileString = '';

  fileString += `  "repository": {\n` +
    `    "type": "git",\n` +
    // `\t\t"url": "https://github.com/${appDetails.cookies.user}/${appDetails.appName}"\n` +
    `    "url": "https://github.com/${appDetails.cookies.user}/${appDetails.github.repoName}"\n` +
    '  },\n';

  return fileString;
};

const addDependencies = dependencies => {
  // get all dependencies in one object (TODO?), otherwise no params needed;
  let fileString = '';

  // currently only HARDCODING express dependency O_O
  fileString += `  "dependencies": {\n` +
    `    "express": "4.13.4"\n  }\n`;
    // or "express": "*" for latest express version
  return fileString;
};

export function buildPackageJSON(fileConfig, userConfig) {
  let file = `{\n  `;
  // add general details about the application:
  file += addAppInfo(userConfig);
  // add details about the repo:
  file += addGitDetails(userConfig);
  // add dependencies:
  file += addDependencies(userConfig);

  file += '}';
  return file;
}
