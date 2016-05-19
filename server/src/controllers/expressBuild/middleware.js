export function addMorgan() {
  return 'var morgan = require(\'morgan\');\n';
}

export function addBodyParser() {
  return 'var bodyParser = require(\'body-parser\');\n';
}

export function addCookieParser() {
  return 'var cookieParser = require(\'cookie-parser\')\n';
}
export function useMorgan() {
  return 'app.use(morgan());\n';
}

export function useCookieParser() {
  return 'app.use(cookieParser())\n';
}

export function useBodyparserJson() {
  return 'app.use(bodyParser.json());\n';
}

export function bodyparserUrlencoded() {
  return 'app.use(bodyParser.urlencoded({\n  extended: true,\n}));\n';
}

export function addDepMorgan() {
  return '    "body-parser": "*",\n';
}

export function addDepCookieparser() {
  return '    "cookie-parser": "*",\n';
}

export function addDepBodyparserJson() {
  return '    "body-parser": "*",\n';
}
