// include middleware

// { id: 'df068b36-99c0-4dc8-83a2-9726ba048958',
//     startPoint: '/endpoint',
//     endpoints: [],
//     editingStartPoint: false,
//     editingName: false,
//     name: 'New router' }

// helper function
import { camelize } from '../../utils/utils.js';

// function camelize(str) {
//   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
//     return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
//   }).replace(/\s+/g, '');
// }

/* -------------------------- */

function addExpress(expressName) {
  return `var ${expressName} = require (\'express\');\n\n`;
}

// use imported middleware
function requireRouters(routers) {
  let fileString = '';
  routers.forEach(router => {
    const name = camelize(router.name);
    fileString += `var ${name} = require('./${name}');\n\n`;
  });
  return fileString;
}

// var routes = require('./routes/index');
// var users = require('./routes/users');
// app.use('/', routes);
// app.use('/users', users);
function useRouters(routers) {
  let fileString = '';
  routers.forEach(router => {
    const name = camelize(router.name);
    fileString += `app.use(\'${router.startPoint}\', ${name});\n\n`;
  });
  return fileString;
}

function addServerListen(name, port) {
  return `app.listen(${port}, function () {console.log(\'${name} listening on port ${port}\');\n`;
}

export function buildMainFile(fileConfig, userConfig) {
  let file = '';
  const expressName = userConfig.serverSettings.expressName || 'app';
  const name = userConfig.appName || 'myApp';
  const port = userConfig.serverSettings.port || 8000;
  const routers = userConfig.routers || [];
  // instantiate express
  file += addExpress(expressName);
  // require router files
  file += requireRouters(routers);
  // use routers as middleware
  file += useRouters(routers);
  // server listen
  file += addServerListen(name, port);
  return file;
}
