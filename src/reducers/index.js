import { combineReducers } from "redux";
import eventsReducers from "./eventsReducers";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";
import imageUpload from "./imageUpload";
import updateEvent from "./updateEvent";

export default combineReducers({
  events: eventsReducers,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  imageUpload,
  updateEvent
});
