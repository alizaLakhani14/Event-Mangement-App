import firebase from "firebase/app";

export const createEvent = (event) => {
    return (dispatch, getFirebase, getState) => {
        dispatch({ type: "LOADING", payload: true });
        const firestore = firebase.firestore();
        firestore
            .collection("Events")
            .add({
                ...event,
            })
            .then(() => {
                dispatch({ type: "CREATE_EVENT", event });
                dispatch({ type: "LOADING", payload: false });
            })
            .catch((err) => {
                // dispatch({ type: "ERROR", err });
                dispatch({ type: "ERROR_CATCHED", payload: true });
                setTimeout(() => {
                    dispatch({ type: "ERROR_CATCHED", payload: false });
                }, 10000);
            });
    };
};

export const deleteEvent = (e) => {
    return (dispatch, getFirebase, getState) => {
        const firestore = firebase.firestore();
        firestore
            .collection("Events")
            .doc(e.id)
            .delete()
            .then((res) => {
                dispatch({ type: "DELETED" });
            })
            .catch((err) => {
                dispatch({ type: "ERROR_CATCHED", payload: true });
                setTimeout(() => {
                    dispatch({ type: "ERROR_CATCHED", payload: false });
                }, 10000);
            });
    };
};

export const updateValues = (
    id,
    name,
    description,
    price,
    maxMembers,
    contactNumber,
    places,
    history
) => {
    return (dispatch, getFirebase, getState) => {
        dispatch({ type: "LOADING", payload: true });
        const firestore = firebase.firestore();
        firestore
            .collection("Events")
            .doc(id)
            .update({
                name,
                description,
                price,
                maxMembers,
                contactNumber,
                places,
            })
            .then(() => {
                dispatch({ type: "LOADING", payload: false });
                history.push("/MyEvents");
            })
            .catch((err) => {
                dispatch({ type: "ERROR_CATCHED", payload: true });
                setTimeout(() => {
                    dispatch({ type: "ERROR_CATCHED", payload: false });
                }, 10000);
            });
    };
};

export const fetchValues = (id, events) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                let values = events.filter((event) => event.id === id);
                if (values.length > 0) {
                    dispatch({ type: "FETCHED_VALUES", payload: values });
                    return resolve(values);
                }
            } catch (error) {
                return resolve(false);
            }
        });
    };
};

export const signIn = (credentials, history) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch({ type: "LOGIN_SUCCESS" });
                history.push("/homePage");
            })
            .catch((err) => {
                dispatch({ type: "ERROR_CATCHED", payload: true });
                setTimeout(() => {
                    dispatch({ type: "ERROR_CATCHED", payload: false });
                }, 10000);
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
            .catch((err) => {
                dispatch({ type: "ERROR_CATCHED", payload: true });
                setTimeout(() => {
                    dispatch({ type: "ERROR_CATCHED", payload: false });
                }, 10000);
            });
    };
};

export const register = (newUser, history) => {
    return (dispatch, getState, getFirebase, getFirestore) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((res) => {
                console.log(res, "resss");
                return firestore.collection("users").doc(res.user.uid).set({
                    name: newUser.name,
                    contact: newUser.contact,
                });
            })
            .then(() => {
                dispatch({ type: "SIGNUP_SUCCESS" });
                history.push("/homePage");
            })
            .catch((err) => {
                dispatch({ type: "ERROR_CATCHED", payload: true });
                setTimeout(() => {
                    dispatch({ type: "ERROR_CATCHED", payload: false });
                }, 10000);
            });
    };
};

export const signInWithGoogle = (parameter) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();

        firebase
            .login({
                provider: "google",
                type: "popup",
            })
            .then((res) => {
                console.log("res", res);
                dispatch({ type: "SIGNED_IN_WITH_GOOGLE" });
            })
            .then(() => parameter.push("/homePage"))
            .catch((err) => {
                dispatch({ type: "ERROR_CATCHED", payload: true });
                setTimeout(() => {
                    dispatch({ type: "ERROR_CATCHED", payload: false });
                }, 10000);
            });
    };
};

export const uploadImage = (files, name) => {
    console.log("incoming files", files);
    return async(dispatch, getState, getFirebase) => {
        try {
            dispatch({ type: "LOADING", payload: true });
            let firebase = getFirebase();
            const imageUrl = await uploadImages(files, name, firebase, dispatch);
            console.log(imageUrl);
            dispatch({ type: "UPLOAD_COMPLETE", payload: imageUrl });
            dispatch({ type: "LOADING", payload: false });
            return Promise.resolve(imageUrl);
        } catch (error) {
            return Promise.resolve(false);
        }
    };
};

const uploadImages = (files, name, firebase, dispatch) => {
    return new Promise((resolve, reject) => {
        let imageUrls = [];
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const uploadTask = firebase
                    .storage()
                    .ref(`images/${name}/${file.name}`)
                    .put(file.originFileObj);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {

                        dispatch({ type: "PROGRESS", payload: "progressing" });
                    },
                    (error) => {
                        console.log(error);
                        reject(error);
                    },
                    async() => {
                        let imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
                        console.log(imageUrl);
                        imageUrls.push(imageUrl);
                        if (imageUrls.length === files.length) {
                            console.log({ imageUrls });
                            resolve(imageUrls);
                        }
                    }
                );
            }
        } catch (error) {
            reject(error);
        }
    });
};