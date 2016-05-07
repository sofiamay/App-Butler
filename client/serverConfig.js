export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export function updateConfig(config) {
  return {
    type: UPDATE_CONFIG,
    newOptions: config,
  };
}
