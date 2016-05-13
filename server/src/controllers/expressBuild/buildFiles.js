import { buildMainFile } from './buildMainFile.js';
import { buildRouterFile } from './buildRouterFile.js';
import { buildPackageJSON } from './buildPackageJSON.js';

export function buildFile(fileConfig, userConfig) {
  // fileConfig: files to be generated specified in request.session.files
  // userConfig: all of the configuration in the request.body.data
  // build main server file
  if (fileConfig.type === 'main') {
    return buildMainFile(fileConfig, userConfig);
  } else if (fileConfig.type === 'packageJSON') {
    return buildPackageJSON(fileConfig, userConfig);
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
<<<<<<< 9b330322893870899290010747836ceb665988ad
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
=======
    return res.status(400).json('Req.session.files not defined');
  }
  for (const fileName in req.session.files) {
    if (fileName) {
      files.push(buildFile(req.session.files[fileName], req.body.data));
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
      authorization: 'token TOKEN',
    },
    body: { name: `${fileConfig.serverSettings.appName}` },
    json: true,
  };

  request(repoOptions, (err, res, body) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log('Repo created');
    res.json(body);
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

    return request(options, (err2, res2, body2) => {
      if (err2) {
        return res2.status(500).send(err2);
      }
      console.log('File generated');
      return res2.json(body2);
    });
  });
>>>>>>> Add more error handlers, fix json structure
}
