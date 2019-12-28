import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Icon } from "antd";
import "./LoginForm.css";
import { signIn, signInWithGoogle } from "./../../actions";
import { connect } from "react-redux";
import { Alert } from "antd";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Enter Your Email Address")
    .email("Invalid Email"),
  password: Yup.string().required("Enter your password")
});

const LoginForm = props => {
  console.log(props);
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          props.signIn(values);
          props.authError === null && props.history.push("/");
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
          <div className="login-form-container">
            <form className="form">
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
            <button
              className="login-button-google"
              type="submit"
              onClick={() => {
                props.signInWithGoogle(props.history);
                props.isEmpty === false && props.history.push("/");
              }}
            >
              <Icon type="google" className="google-icon" />
              Login with Google
            </button>
          </div>
        )}
      </Formik>
      {props.authError === "Login Failed" && (
        <Alert type="error" message="Invalid Email or Password"></Alert>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    isEmpty: state.firebase.auth.isEmpty
  };
};
const mapDispatchToProps = {
  signIn,
  signInWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
