import { buildMainFile } from '../../../../server/build/controllers/expressBuild/buildMainFile.js';
// const GH_TOKEN = require('/../../token.js');

const http = require('https');

export function buildFile(fileConfig, userConfig) {
  // build main server file
  if (fileConfig.type === 'main') { return buildMainFile(fileConfig, userConfig); }
  return new Error('Undefined file type');
}

export function buildAllFiles(request) {
  const files = [];
  for (const fileName in request.session.files) {
    if (request.session.files) {
      files.push(buildFile(request.session.files[fileName], request.body.data));
    }
  }
  return files;
}
export function fileToGitHub(fileConfig, userConfig, fileName) {
  const file = buildFile(fileConfig, userConfig);
  const encodedFile = new Buffer(file).toString('base64');
  const options = {
    method: 'PUT',
    hostname: 'api.github.com',
    port: null,
    path: `/repos/dylanksys/WOW/contents/${fileName}`,
    headers: {
      authorization: 'token ', // + process.env.GH_TOKEN,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
      'user-agent': 'appButler',
    },
  };

  const req = http.request(options, (res) => {
    const chunks = [];
    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(JSON.stringify({ message: 'Initial Commit',
  content: encodedFile,
  committer: { name: 'AppButler', email: 'AppButler@AppButler.io' } }));
  req.end();
}

