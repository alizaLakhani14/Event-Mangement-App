import firebase from "firebase/app";

export const createEvent = event => {
  return (dispatch, getFirebase, getState) => {
    console.log(getState(), "events state");
    const firestore = firebase.firestore();
    firestore
      .collection("Events")
      .add({
        ...event
      })
      .then(() => {
        dispatch({ type: "CREATE_EVENT", event });
      })
      .catch(err => {
        dispatch({ type: "ERROR", err });
      });
  };
};

export const deleteEvent = e => {
  return (dispatch, getFirebase, getState) => {
    const firestore = firebase.firestore();
    firestore
      .collection("Events")
      .doc(e.id)
      .delete()
      .then(res => {
        dispatch({ type: "DELETED" });
      })
      .catch(err => {
        dispatch({ type: "NOT_DELETED" });
      });
  };
};

export const signIn = credentials => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const register = newUser => {
  return (dispatch, getState, getFirebase, getFirestore) => {
    // console.log(newUser)
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        console.log(res, "resss");
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            name: newUser.name,
            contact: newUser.contact
            // id: newUser.uid
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const signInWithGoogle = parameter => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase
      .login({
        provider: "google",
        type: "popup"
      })
      .then(res => {
        console.log("res", res);
        dispatch({ type: "SIGNED_IN_WITH_GOOGLE" });
        parameter.push("/");
      })
      .catch(err => {
        console.log({ err }, "google error");
      });
  };
};

export const uploadImage = (files, name) => {
  console.log("incoming files", files);
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    let uploadTask;
    const imageUrls = [];
    let urls = [];
    files.forEach(file => {
      console.log(file, "individual file");
      uploadTask = firebase
        .storage()
        .ref(`images/${name}/${file.name}`)
        .put(file.originFileObj);

      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log('Checking')
          const progress = Math.random(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          dispatch({ type: "PROGRESS" });
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            imageUrls.push(downloadURL)
            urls.push([...imageUrls])
            dispatch({ type: "UPLOAD_COMPLETE", payload: downloadURL });
          });
        }
      );
    });
    console.log("In action", imageUrls)
    return urls;
  };
};

// export const uploadImage = file => {
//   console.log(file, "actions");
//   return (dispatch, getState, getFirebase) => {
//     const firebase = getFirebase();
//     const uploadTask = firebase
//       .storage()
//       .ref(`images/${file.name}`)
//       .put(file);

//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         const progress = Math.random(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         console.log(snapshot);
//         dispatch({ type: "PROGRESS" });
//       },
//       error => {
//         console.log(error);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//           dispatch({ type: "UPLOAD_COMPLETE", payload: downloadURL });
//         });
//       }
//     );
//   };
// };
