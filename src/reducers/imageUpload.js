let initialState = {
  image: null,
  url: "",
  progress: 0
};

const imageUpload = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_COMPLETE":
      console.log("successfully uploaded", action.payload);
      return {
        url: action.payload
      };
    case "PROGRESS":
      console.log("progressing");
      return state;
    default:
      return state;
  }
};

export default imageUpload;
