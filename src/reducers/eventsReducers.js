let events = [
  {
    name: "event1",
    description: "this is a event",
    maxNumbers: 4,
    pricePerTicket: 400,
    contactNumber: 5555,
    id: 1
  },
  {
    name: "event 2",
    description: "this is a event",
    maxNumbers: 9,
    pricePerTicket: 800,
    contactNumber: 6666,
    id: 2
  }
];

export default (state = events, action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      return [...state, action.event];

    default:
      return state;
  }
};
