let events = [];

export default (state = events, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      return [...state, action.event];

    default:
      return state;
  }
};
