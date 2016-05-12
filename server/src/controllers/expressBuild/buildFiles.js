import { buildMainFile } from '../../../../server/build/controllers/expressBuild/buildMainFile.js';

import request from 'request';

export function buildFile(fileConfig, userConfig) {
  // build main server file
  if (fileConfig.type === 'main') {
    return buildMainFile(fileConfig, userConfig);
  } else if (fileConfig.type === 'router') {
    return buildRouterFile(fileConfig, userConfig);
  }
  return new Error('Undefined file type');
}

export function fileToGitHub(file, fileName, fileConfig, userConfig) {
  // const file = buildFile(fileConfig, userConfig);
  const encodedFile = new Buffer(file).toString('base64');

  const repoOptions = {
    method: 'POST',
    url: 'https://api.github.com/user/repos',
    headers: {
      'user-agent': 'AppButler',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: 'token TOKEN',
    },
    body: { name: `${fileConfig.serverSettings.appName}` },
    json: true,
  };

  request(repoOptions, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Repo created');
    }
  });

  const options = {
    method: 'PUT',
    url: `https://api.github.com/repos/dylanksys/${fileConfig.serverSettings.appName}/contents/${fileName}`,
    headers: {
      authorization: 'token TOKEN',
      'content-type': 'application/json',
      'cache-control': 'no-cache',
      'user-agent': 'AppButler',
    },
    body: JSON.stringify({
      message: 'Initial Commit',
      content: encodedFile,
      committer: { name: 'AppButler', email: 'AppButler@AppButler.io' },
      json: true,
    }),
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File generated');
    }
  });
}

export function buildAllFiles(request, response) {
  const files = [];
  for (const fileName in request.session.files) {
    if (fileName) {
      files.push(buildFile(request.session.files[fileName], request.body));
    }
  }
  fileToGitHub(files[0], 'server.js', request.body);
  return files;
}
