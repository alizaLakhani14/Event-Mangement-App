// let initialState = {
//   image: null,
//   urls: [],
//   progress: 0
// };

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

// let initialState = {
//   image: null,
//   url: "",
//   progress: 0
// };

// const imageUpload = (state = initialState, action) => {
//   switch (action.type) {
//     case "UPLOAD_COMPLETE":
//       console.log("successfully uploaded", action.payload);
//       return {
//         url: action.payload
//       };
//     case "PROGRESS":
//       console.log("progressing");
//       return state;
//     default:
//       return state;
//   }
// };

// export default imageUpload;
