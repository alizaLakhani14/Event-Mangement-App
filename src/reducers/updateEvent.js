// let fetchedValues = [];

let initialState = {
  fetchedValues: [],
  isUpdated: false
};

const updateEvent = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_VALUES":
      return action.payload;
    case "UPDATED":
      return {
        ...state,
        isUpdated: true
      };
    default:
      return state;
  }
};

export default updateEvent;
