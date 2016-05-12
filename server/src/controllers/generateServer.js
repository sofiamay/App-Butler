import { buildAllFiles } from '../../build/controllers/expressBuild/buildFiles.js';
import Config from '../../build/models/config.js';

export function generateExpressServer(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server.js',
    },
  };
  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  return response.send(JSON.stringify(builtFiles));
}

export function generateServer(request, response) {
  const reqData = request.body;
  if (reqData && reqData.serverType && reqData.serverType === 'express') {
    // generate express server
    return generateExpressServer(request, response);
  }
  return response.status(400).send('No server type on request');
}


export function createConfig(request, response) {
  const newConfig = new Config({
    appName: request.body.appName,
    port: request.body.port,
    expressName: request.body.expressName,
    serverType: request.body.serverType,
  });
  newConfig.save((err) => {
    if (err) {
      response.json(err);
    }
    response.send(JSON.stringify(newConfig));
  });
}

