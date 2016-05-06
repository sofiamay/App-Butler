import uuid from 'node-uuid';

export const CREATE_ROUTER = 'CREATE_LANE';
export function createRouter(router) {
  return {
    type: CREATE_ROUTER,
    router: {
      id: uuid.v4(),
      endpoints: router.endpoints || [],
      ...router,
    },
  };
}
