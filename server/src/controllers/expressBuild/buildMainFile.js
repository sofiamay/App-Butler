// include middleware


function addExpress(expressName) {
  return `var ${expressName} = require (\'express\');\n`;
}

// use imported middleware
function addMiddleware() {
  return '';
}

function addServerListen(name, port) {
  return `app.listen(${port}, function () {console.log(\'${name} listening on port ${port}\');`;
}

export function buildMainFile(fileConfig, userConfig) {
  let file = '';
  // instantiate express
  const expressName = userConfig.serverSettings.expressName || 'app';
  file += addExpress(expressName);
  // check for middleware
  if (userConfig.middleware) { file += addMiddleware(); }
  // server listen
  const name = userConfig.appName || 'myApp';
  const port = userConfig.serverSettings.port || 8000;
  file += addServerListen(name, port);
  console.log(file);
  return file;
}
