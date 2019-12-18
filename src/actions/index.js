const createEvent = event => {
  event.id = Math.random() * 10000;
  return {
    type: "CREATE_EVENT",
    event: event
  };
};
