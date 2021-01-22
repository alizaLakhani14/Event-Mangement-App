let events = [];

export default (state = events, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      // console.log("create event", action.event);
      return [...state, action.event];
    case "ERROR":
      // console.log("Error occurred");
      return state;

    case "DELETED":
      return state;
    case "NOT_DELETED":
      return state;
    default:
      return state;
  }
};