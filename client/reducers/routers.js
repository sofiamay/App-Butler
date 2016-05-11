// Some Reducers factored out into functions to reduce complexity

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
    case 'CREATE_ENDPOINT':
      return state.slice().map(router => {
        if (router.id === action.routerId) {
          const newRouter = Object.assign({}, router);
          newRouter.endpoints.push(action.endpoint);
          return newRouter;
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
