const initialState = {
  authError: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("Login Error");
      return {
        ...state,
        authError: "Login Failed"
      };

    case "LOGIN_SUCCESS":
      console.log("success");
      return {
        ...state,
        authError: null
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return {
        ...state
      };

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("signup fail");
      return {
        ...state,
        authError: action.err.message
      };

      case "SIGNED_IN_WITH_GOOGLE" :
        return{
          ...state,
          authError:null
        }
    default:
      return state;
  }
};

export default authReducer;
