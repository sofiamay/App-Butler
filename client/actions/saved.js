export function setState(config) {
  return {
    type: 'SET_STATE',
    config,
  };
}

export function setMiddleware(middleware) {
  const midware = {};
  for (const ware in middleware) {
    if (ware) {
      midware[ware] = {};
      midware[ware].value = middleware[ware];
    }
  }
  return midware;
}

export function setGithub(github) {
  const git = {};
  for (const val in github) {
    if (val) {
      git[val] = {};
      git[val].value = github[val];
    }
  }
  return git;
}
