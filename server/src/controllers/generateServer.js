import { createRepo, createFile } from './githubController.js';
import { extend } from './../utils/utils';
import { buildAllFiles } from '../../build/controllers/expressBuild/buildFiles.js';

export function generate(request, response) {
  request.session.files = {
    serverJS: {
      type: 'main',
      name: 'server',
    },
  };

<<<<<<< 4bb9460cbfc69a27c9e8fb8627b1a932b031ebc7
  if (request.body.data.routers.length) {
    request.session.files.routers = {
      type: 'router',
      name: request.body.data.routers,
    };
  }

  // copy cookies to body.data
  request.body.data.cookies = {};
  // TODO: remove userInfo parameter
  extend(request.body.data.cookies, request.cookies);
  // EMAIL BUG: fix '@'
  // copy appName to routers obj
  request.body.data.routers.forEach(router => {
    router.appName = request.body.data.appName;
  });
=======
  request.body.data.routers.forEach(router => {
    request.session.files[router.id] = {
      type: 'router',
      name: router.name,
      // startPoint: router.startPoint,
      // endPoint: router.endpoints,
    };
  });
  console.log(request.session.files);
>>>>>>> Fix sessionFiles, start to create dynamic fileToGithub

  const builtFiles = buildAllFiles(request, response);
  // Send these files to github!
  // Make repo (naming handled in controller)
  createRepo(request.body.data).then(() => {
    // separate calls for every file
    // builtFiles will always only be [serverFile, [routerFiles]]
    createFile(builtFiles[0], request.body.data, request.body.data.cookies, 'server').then(() => {
      // successfully created server file
      const asyncRun = (filesArr, ind) => {
        ind = ind || 0;
        if (ind !== filesArr.length) {
          createFile(filesArr[ind], request.body.data.routers[ind], request.body.data.cookies).then(() => {
            asyncRun(filesArr, ind + 1);
          }).catch((routerErr) => {
            console.log(`Problem creating router files on your GitHub: Error: ${routerErr}`);
            response.status(400).send(`Problem creating router files on your GitHub: Error: ${routerErr}`);
          });
        } else {
          return response.status(201).send({
            user: request.cookies.user,
            repoName: request.body.data.appName,
          });
        }
      };
      asyncRun(builtFiles[1], 0);
    }).catch(serverError => {
      console.log(`Error creating server ${serverError}`);
      response.status(400).send(`Error creating server: ${serverError}`);
    });
  }).catch((error) => {
    console.log(`Problem creating repo on your GitHub: Error: ${error}`);
    response.status(400).send(`Problem creating repo on your GitHub: Error: ${error}`);
  });
}

export function generateFiles(request, response) {
  const reqData = request.body.data;
  if (!reqData) {
    return response.status(400).send(new Error('No server type on request'));
  }

  // generate express server
  return generate(request, response);
}

export function generateServer(request, response) {
  const reqData = request.body.data;
  if (!reqData.serverType) {
    return response.status(400).send(new Error('No server type on request'));
  }

  // generate express server
  return generateExpressServer(request, response);
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
      return response.status(500).json(err);
    }
    return response.json(newConfig);
  });
}
