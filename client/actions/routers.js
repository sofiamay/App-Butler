import uuid from 'node-uuid';

export const CREATE_ROUTER = 'CREATE_ROUTER';
export function createRouter(router) {
  return {
    type: CREATE_ROUTER,
    router: {
      id: uuid.v4(),
      startPoint: '/',
      endpoints: [],
      ...router,
    },
  };
}

export const DELETE_ROUTER = 'DELETE_ROUTER';
export function deleteRouter(id) {
  return {
    type: DELETE_ROUTER,
    id,
  };
}

export const MOVE_ROUTER = 'MOVE_ROUTER';
export function moveRouter({ sourceId, targetId, targetIndex }) {
  return {
    type: MOVE_ROUTER,
    sourceId,
    targetId,
    targetIndex,
  };
}

export const CREATE_ENDPOINT = 'CREATE_ENDPOINT';
export function createEndpoint(endpoint) {
  return {
    type: CREATE_ENDPOINT,
    routerId: endpoint.routerId,
    endpoint: {
      id: uuid.v4(),
      endpoint: '/myNewEndpoint',
      methods: [],
      ...endpoint,
    },
  };
}
export const MOUNT_ENDPOINT = 'MOUNT_ENDPOINT';
export function mountEndpoint({
  sourceId,
  targetId,
  sourceRouterIndex,
  sourceEndpointIndex,
}) {
  return {
    type: MOUNT_ENDPOINT,
    sourceId,
    targetId,
    sourceRouterIndex,
    sourceEndpointIndex,
  };
}

export const MOVE_ENDPOINT = 'MOVE_ENDPOINT';
export function moveEndpoint({
  sourceId,
  targetId,
  sourceEndpointIndex,
  targetEndpointIndex,
  sourceRouterIndex,
  targetRouterIndex,
}) {
  return {
    type: MOVE_ENDPOINT,
    sourceId,
    targetId,
    sourceEndpointIndex,
    targetEndpointIndex,
    sourceRouterIndex,
    targetRouterIndex,
  };
}
