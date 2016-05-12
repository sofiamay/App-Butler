import uuid from 'node-uuid';

export const CREATE_ROUTER = 'CREATE_ROUTER';
export function createRouter(router) {
  return {
    type: CREATE_ROUTER,
    router: {
      id: uuid.v4(),
      startPoint: '/',
      endpoints: [],
      editing: false,
      ...router,
    },
  };
}

export const UPDATE_ROUTER = 'UPDATE_ROUTER';
export function updateRouter({ updates, id }) {
  return {
    type: UPDATE_ROUTER,
    updates,
    id,
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
      editing: false,
      ...endpoint,
    },
  };
}

export const UPDATE_ENDPOINT = 'UPDATE_ENDPOINT';
export function updateEndpoint({ updates, routerIndex, id }) {
  return {
    type: UPDATE_ENDPOINT,
    updates,
    routerIndex,
    id,
  };
}

export const DELETE_ENDPOINT = 'DELETE_ENDPOINT';
export function deleteEndpoint({ id, routerIndex }) {
  return {
    type: DELETE_ENDPOINT,
    id,
    routerIndex,
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
