export default function todoReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PANEL':
      state.ui.panel.open = !state.ui.panel.open;
      return state.ui.panel.open;
    default:
      return state;
  }
}
