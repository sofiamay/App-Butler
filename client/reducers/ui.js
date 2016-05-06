export default function uiReducer(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return Object.assign({}, state, {
        designer: {
          currentCategory: action.category,
        },
      });
    default:
      return state;
  }
}
