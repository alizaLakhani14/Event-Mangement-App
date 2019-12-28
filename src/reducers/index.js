import { combineReducers } from "redux";
import eventsReducers from "./eventsReducers";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import imageUpload from "./imageUpload";

export default combineReducers({
  events: eventsReducers,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  imageUpload
});
