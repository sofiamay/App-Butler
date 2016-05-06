import update from 'react/lib/update';

export default function routeReducer(state = {}, action) {
  switch (action.type) {
    case 'CREATE_ROUTER':
      return update(state, {
        designer: {
          routers: { $push: action.router },
        },
      });
    default:
      return state;
  }
}
