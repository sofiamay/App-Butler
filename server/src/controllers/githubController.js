import request from 'request';

export function createRepo(options) {
  if (!options) {
    throw new Error('Error: Options required for repo creation.');
  }

  const repoOptions = {
    method: 'POST',
    url: 'https://api.github.com/user/repos',
    headers: {
      'user-agent': 'AppButler',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: 'token TOKEN',
    },
    body: {
      name: `${options.appName}`,
    },
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(repoOptions, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

export function fileToGitHub(file, fileName, fileConfig) {
  // const file = buildFile(fileConfig, userConfig);
  const encodedFile = new Buffer(file).toString('base64');
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