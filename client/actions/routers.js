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

export const MOVE_ROUTER = 'MOVE_ROUTER';
export function moveRouter({ sourceId, targetId }) {
  return {
    type: MOVE_ROUTER,
    sourceId,
    targetId,
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
