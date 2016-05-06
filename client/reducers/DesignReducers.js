export default function todoReducer(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return Object.assign({}, state, {
        design: {
          currentCategory: action.category,
        },
      });
    default:
      return state;
  }
}
