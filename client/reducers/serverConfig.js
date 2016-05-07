export default function serverConfigReducer(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return Object.assign({}, state, action.newOptions);
    default:
      return state;
  }
}
