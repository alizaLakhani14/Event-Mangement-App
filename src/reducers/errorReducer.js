const errorReducer = (state = false, action) => {
  switch (action.type) {
    case "ERROR_CATCHED":
      return action.payload;
    default:
      return state;
  }
};
export default errorReducer;
