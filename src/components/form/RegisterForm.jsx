import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "antd";
import "./RegisterForm.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Must enter your name")
    .min(6, "too short"),
  contact: Yup.number().required("Must give number"),
  email: Yup.string()
    .required("Must give email")
    .email("Invalid Email"),
  password: Yup.string()
    .required("Enter your Password")
    .min(8, "Too short"),
  confirmPassword: Yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    )
  })
});

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        contact: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log("submitted");
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
        <form className='form'>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              id="name"
              name="name"
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <div className="Error-message">{errors.name}</div>
            ) : null}
          </div>
          <div className="form-field">
            <label htmlFor="contact">Contact</label>
            <Input
              type="number"
              placeholder="Enter contact Number"
              id="contact"
              name="contact"
              onChange={handleChange}
              value={values.contact}
              onBlur={handleBlur}
            />
            {errors.contact && touched.contact ? (
              <div className="Error-message">{errors.contact}</div>
            ) : null}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="Enter Email Address"
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <div className="Error-message">{errors.email}</div>
            ) : null}
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <Input.Password
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <div className="Error-message">{errors.password}</div>
            ) : null}
          </div>
          <div className="form-field">
            <label htmlFor="password">Confirm Password</label>
            <Input.Password
              type="password"
              placeholder="Enter the confirmed password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
            />
            {errors.confirmPassword ? (
              <div className="Error-message">{errors.confirmPassword}</div>
            ) : null}
          </div>
          <div className="form-field Button">
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
