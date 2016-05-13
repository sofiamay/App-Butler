import { buildMainFile } from './buildMainFile.js';
import { buildRouterFile } from './buildRouterFile.js';

export function buildFile(fileConfig, userConfig) {
  // fileConfig: files to be generated specified in request.session.files
  // userConfig: all of the configuration in the request.body.data
  // build main server file
  if (fileConfig.type === 'main') {
    return buildMainFile(fileConfig, userConfig);
  } else if (fileConfig.type === 'router') {
    const files = [];
    userConfig.routers.forEach((router) => {
      files.push(buildRouterFile(fileConfig, router));
    });
    return files;
  }
  return new Error('Undefined file type');
}

export function buildAllFiles(req, res) {
  const files = [];
  if (!req.session.files) {
    return res.status(400).json(new Error('Req.session.files not defined'));
  }

  for (const fileName in req.session.files) {
    if (fileName) {
      files.push(buildFile(req.session.files[fileName], req.body.data));
      // Code below puts all files in one array
      // const result = buildFile(req.session.files[fileName], req.body.data);
      // if (Array.isArray(result)) {
      //   result.forEach(file => {
      //     files.push(file);
      //   });
      // } else {
      //   files.push(result);
      // }
    }
  }

  return files;
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
      authorization: 'token cbe36bee52b94370ba007fa1837841d4d23c1c42',
    },
    body: { name: `${fileConfig.serverSettings.appName}` },
    json: true,
  };

  request(repoOptions, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Repo created');
      const options = {
        method: 'PUT',
        url: `https://api.github.com/repos/dylanksys/${fileConfig.serverSettings.appName}/contents/${fileName}`,
        headers: {
          authorization: 'token cbe36bee52b94370ba007fa1837841d4d23c1c42',
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
          return console.log(err);
        }
        console.log('File generated');
      });
    }
  });
}
