// Some Reducers factored out into functions to reduce complexity
const moveRouter = (state, action) => {
  const { sourceId, targetId } = action;
  const sourceRouterIndex = state.findIndex(router => router.id === sourceId);
  const sourceRouter = state[sourceRouterIndex];

  const newState = state.slice();
  newState.splice(sourceRouterIndex, 1);

  const targetRouterIndex = state.findIndex(router => router.id === targetId);
  newState.splice(targetRouterIndex, 0, sourceRouter);
  return newState;
};

const mountEndpoint = (state, action) => {
  const { targetId, sourceId } = action;
  const sourceRouterIndex = state.findIndex(router =>
    router.endpoints.findIndex(endpoint =>
      endpoint.id === sourceId
      ) !== -1
  );
  // Find the index of the endpoint within array
  const sourceEndpointIndex = state[sourceRouterIndex].endpoints
    .findIndex(endpoint => endpoint.id === sourceId);
  // We need to make a copy of the source to remove it
  const sourceEndpoint = state[sourceRouterIndex].endpoints[sourceEndpointIndex];

  return state.map((router, index) => {
    if (index === sourceRouterIndex) {
      const newEndpoints = router.endpoints.slice();
      newEndpoints.splice(sourceEndpointIndex, 1);
      return Object.assign({}, router, {
        endpoints: newEndpoints,
      });
    }

    if (router.id === targetId) {
      return Object.assign({}, router, {
        endpoints: [...router.endpoints, sourceEndpoint],
      });
    }

    return router;
  });
};

const moveEndpoint = (state, action) => {
  // Source references must be constantly updated,
  // as they are captured at drag time and not dynamically updated
  const sourceId = action.sourceId;
  const sourceRouterIndex = state.findIndex(router =>
    router.endpoints.findIndex(endpoint =>
      endpoint.id === sourceId
      ) !== -1
  );
  // Find the index of the endpoint within array
  const sourceEndpointIndex = state[sourceRouterIndex].endpoints
    .findIndex(endpoint => endpoint.id === sourceId);
  // We need to make a copy of the source to remove it
  const sourceEndpoint = state[sourceRouterIndex].endpoints[sourceEndpointIndex];
  // Target references are automatically updated for each move action
  const targetRouterIndex = action.targetRouterIndex;
  const targetEndpointIndex = action.targetEndpointIndex;

  // Endpoint is moving within the same router
  if (sourceRouterIndex === targetRouterIndex) {
    return state.map((router, index) => {
      if (index === sourceRouterIndex) {
        // Make a copy of the endpoints array & remove the old endpoint
        const newEndpoints = router.endpoints.slice();
        newEndpoints.splice(sourceEndpointIndex, 1);

        // Insert the source endpoint into the endpoints array
        newEndpoints.splice(targetEndpointIndex, 0, sourceEndpoint);
        // Update the router with the new endpoints
        return Object.assign({}, router, {
          endpoints: newEndpoints,
        });
      }
      return router;
    });
  }
  // Endpoints are on different routers
  return state.map((router, index) => {
    // Remove from source router
    if (index === sourceRouterIndex) {
      return Object.assign({}, router, {
        endpoints: router.endpoints.length > 1 ?
          router.endpoints
          .slice(0, sourceEndpointIndex)
          .concat(router.endpoints
            .slice(sourceEndpointIndex + 1)
          ) : [],
      });
    }
    // Move into target router
    if (index === targetRouterIndex) {
      const newEndpoints = router.endpoints.slice();
      newEndpoints.splice(targetEndpointIndex, 0, sourceEndpoint);

      return Object.assign({}, router, {
        endpoints: newEndpoints,
      });
    }
    // Return untouched router otherwise
    return router;
  });
};

export default function routeReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_ROUTER':
      return [...state, action.router];
    case 'UPDATE_ROUTER':
      return state.map(router => {
        if (router.id === action.id) {
          return Object.assign({}, router, action.updates);
        }
        return router;
      });
    case 'MOVE_ROUTER':
      return moveRouter(state, action);
    case 'DELETE_ROUTER':
      return state.filter(router => router.id !== action.id);
    case 'CREATE_ENDPOINT':
      return state.map(router => {
        if (router.id === action.routerId) {
          const newRouter = Object.assign({}, router);
          newRouter.endpoints.push(action.endpoint);
          return newRouter;
        }
        return router;
      });
    case 'UPDATE_ENDPOINT':
      return state.map((router, index) => {
        if (index === action.routerIndex) {
          const newEndpoints = router.endpoints
          .map(endpoint => {
            if (endpoint.id === action.id) {
              return Object.assign({}, endpoint, action.updates);
            }
            return endpoint;
          });
          return Object.assign({}, router, { endpoints: newEndpoints });
        }
        return router;
      });
    case 'DELETE_ENDPOINT':
      return state.map((router, index) => {
        if (index === action.routerIndex) {
          const newEndpoints = router.endpoints.filter(endpoint => endpoint.id !== action.id);
          return Object.assign({}, router, { endpoints: newEndpoints });
        }
        return router;
      });
    case 'MOUNT_ENDPOINT':
      return mountEndpoint(state, action);
    case 'MOVE_ENDPOINT':
      return moveEndpoint(state, action);
    default:
      return state;
  }
}
