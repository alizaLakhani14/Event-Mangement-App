let events = [];

export default (state = events, action) => {
    switch (action.type) {
        case "CREATE_EVENT":
            return [...state, action.event];
        case "ERROR":
            return state;
        case "DELETED":
            return state;
        case "NOT_DELETED":
            return state;
        default:
            return state;
    }
};