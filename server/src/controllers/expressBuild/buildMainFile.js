// include middleware

function addExpress(expressName) {
  return `var ${expressName} = require (\'express\');\n`;
}

// use imported middleware
function requireRouters(routers) {
  let fileString = '';
  routers.forEach(router => {
    fileString += `var ${router.name} = require('./{router.name}');`;
  });
  return fileString;
}

function addServerListen(name, port) {
  return `app.listen(${port}, function () {console.log(\'${name} listening on port ${port}\');`;
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
  // server listen
  file += addServerListen(name, port);
  return file;
}
