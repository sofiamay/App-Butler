import { addMorgan, addBodyParser,
  addCookieParser, useMorgan, bodyparserUrlencoded,
  useCookieParser, useBodyparserJson } from './middleware.js';

function addExpress() {
  return `var express = require (\'express\');\n`;
}

function requireMiddleware(middleware) {
  let fileString = '';
  if (middleware.morgan) { fileString += addMorgan(); }
  if (middleware.cookieparser) { fileString += addCookieParser(); }
  if (middleware.bodyparserJson || middleware.bodyparserUrlencoded) {
    fileString += addBodyParser();
  }
  return fileString;
}

function useMiddleware(middleware) {
  let fileString = '';
  if (middleware.morgan) { fileString += useMorgan(); }
  if (middleware.cookieparser) { fileString += useCookieParser(); }
  if (middleware.bodyparserJson) { fileString += useBodyparserJson(); }
  if (middleware.bodyparserUrlencoded) { fileString += bodyparserUrlencoded(); }
  return fileString;
}

// use imported middleware
function requireRouters(routers) {
  let fileString = '';
  routers.forEach(router => {
    const name = camelize(router.name);
    fileString += `var ${name} = require('../routers/${name}');\n`;
  });
  return fileString;
}

const initializeExpress = () => '\nvar app = express();\n\n';

function useRouters(routers) {
  let fileString = '';
  routers.forEach(router => {
    const name = camelize(router.name);
    fileString += `app.use(\'${router.startPoint}\', ${name});\n`;
  });
  return fileString;
}

function addServerListen(name, port) {
  return `\napp.listen(${port}, function () {\n  console.log(\'${name} listening on port ${port}\');\n};\n`;
}

export function buildMainFile(fileConfig, userConfig) {
  let file = '';
  const name = userConfig.appName || 'myApp';
  const port = userConfig.serverSettings.port || 8000;
  const routers = userConfig.routers || [];
  const middleware = userConfig.middleware || [];
  // require express
  file += addExpress();
  // require middleware
  file += requireMiddleware(middleware);
  // require router files
  file += requireRouters(routers);
  // initialize express
  file += initializeExpress();
  // use middleware
  file += useMiddleware(middleware);
  // use routers as middleware
  file += useRouters(routers);
  // server listen
  file += addServerListen(name, port);

  return file;
}
