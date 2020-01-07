let fetchedValues = [];

const updateEvent = (state = fetchedValues, action) => {
  switch (action.type) {
    case "FETCHED_VALUES":
      return action.payload;
    default:
      return state;
  }
};

export default updateEvent;
