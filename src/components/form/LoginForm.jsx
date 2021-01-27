import { useHistory } from "react-router-dom";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Icon } from "antd";
import "./LoginForm.css";
import { signIn, signInWithGoogle } from "./../../actions";
import { connect } from "react-redux";
import { Alert } from "antd";
import Header from "./../Header/Header";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Enter Your Email Address")
    .email("Invalid Email"),
  password: Yup.string().required("Enter your password")
});

const LoginForm = props => {
  let history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          props.signIn(values, history);
         
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <>
            <Header />
            <div className="container">
              <div className="login-form-container">
                <form className="login-form">
                  <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <Input
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    ></Input>
                    {errors.email && touched.email ? (
                      <div className="Error-message">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <Input.Password
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                    ></Input.Password>
                    {errors.password && touched.password ? (
                      <div className="Error-message">{errors.password}</div>
                    ) : null}
                  </div>
                  <div className="form-field">
                    <Button type="primary submit" onClick={handleSubmit}>
                      Login
                    </Button>
                  </div>
                  <div className="partition">
                    <hr></hr>
                    <span className="partition-span">OR</span>
                    <hr></hr>
                  </div>
                </form>
                <div className="form-field">
                  <button
                    className="login-button-google"
                    type="submit"
                    onClick={() => {
                      props.signInWithGoogle(props.history);
                   
                    }}
                  >
                    <Icon type="google" className="google-icon" />
                    Login with Google
                  </button>
                </div>
                <div className="form-field">
                  <p>
                    Don't have an account.
                    <span
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        margin: "1px",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        props.history.push("/register");
                      }}
                    >
                      Register
                    </span>
                  </p>
                </div>
              </div>
              <div className="error-div">
                {props.error === true && (
                  <Alert
                    style={{
                      margin: "1em",
                      width: "300px",
                      textAlign: "center"
                    }}
                    type="error"
                    message="Invalid Email or Password"
                  ></Alert>
                )}
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    isEmpty: state.firebase.auth.isEmpty,
    error: state.errorReducer
  };
};
const mapDispatchToProps = {
  signIn,
  signInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
