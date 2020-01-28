

let urls = [];

const imageUpload = (state = urls, action) => {
  switch (action.type) {
    case "UPLOAD_COMPLETE":
      return [...state, action.payload];
    case "PROGRESS":
      return state; 
    default:
      return state;
  }
};

export default imageUpload;


