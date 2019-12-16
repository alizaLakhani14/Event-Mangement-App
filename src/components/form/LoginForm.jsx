import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Icon } from "antd";
import "./LoginForm.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Enter Your Email Address")
    .email("Invalid Email"),
  password: Yup.string().required("Enter your password")
});

const LoginForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
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
                <Button type="primary" onClick={handleSubmit}>
                  Login
                </Button>
              </div>
              <div className="partition">
                <hr></hr>
                <span className="partition-span">OR</span>
                <hr></hr>
              </div>
              <button className="login-button-google">
                <Icon type="google" className="google-icon" />
                Login with Google
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
