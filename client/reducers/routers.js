// import update from 'react/lib/update';

export default function routeReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_ROUTER':
      return [...state, action.router];
    case 'CREATE_ENDPOINT':
      return state.slice().map(router => {
        if (router.id === action.routerId) {
          const newRouter = Object.assign({}, router);
          newRouter.endpoints.push(action.endpoint);
          return newRouter;
        }
        return router;
      });
    default:
      return state;
  }
}
