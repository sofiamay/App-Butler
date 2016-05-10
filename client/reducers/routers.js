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
    case 'MOVE_ENDPOINT':
      if (action.sourceRouterIndex === action.targetRouterIndex) {
        return state.map((router, index) => {
          if (index === action.sourceRouterIndex) {
            const sourceEndpointIndex = router.endpoints.findIndex(endpoint => endpoint.id === action.sourceId);

            const sourceEndpoint = Object.assign({}, router.endpoints[sourceEndpointIndex]);
            console.log('endpoint', sourceEndpoint);
            const newEndpoints = router.endpoints.slice();
            newEndpoints.splice(sourceEndpointIndex, 1)
            const targetEndpointIndex = router.endpoints.findIndex(endpoint => endpoint.id === action.targetId);
            newEndpoints.splice(targetEndpointIndex, 0, sourceEndpoint);
            console.log('newEndpoints: ', newEndpoints);
            return Object.assign({}, router, {
              endpoints: newEndpoints,
            });
          }
          return router;
        });
      }
      return state;
    default:
      return state;
  }
}
