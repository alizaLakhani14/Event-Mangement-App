import { useHistory } from "react-router-dom";
import React from "react";
import { Input } from "antd";
import { Formik } from "formik";
import "./CreateEvent.css";
import { connect } from "react-redux";
import { createEvent } from "./../../actions";
const { TextArea } = Input;

const CreateEvent = props => {
  let history = useHistory();
  console.log(props);
  return (
    <Formik
      initialValues={{
        name: "",
        maxMembers: "",
        description: "",
        price: "",
        contactNumber: ""
      }}
      onSubmit={values => {
        history.push("/");
        console.log(values)
        props.createEvent(values);
      }}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="eventName">Event Name</label>
              <Input
                type="text"
                placeholder="Event name"
                id="name"
                name="name"
                onChange={handleChange}
              ></Input>
            </div>
            <div className="form-field">
              <label htmlFor="maxMembers">Maxium Members</label>
              <Input
                type="number"
                id="maxMembers"
                name="maxMembers"
                onChange={handleChange}
              ></Input>
            </div>
            <div className="form-field">
              <label htmlFor="description">Event Description</label>
              <Input.TextArea
                placeholder="Describe your event...."
                type="text"
                id="description"
                name="description"
                autoSize={true}
                maxLength={1000}
                onChange={handleChange}
              ></Input.TextArea>
            </div>
            <div className="form-field">
              <label htmlFor="price">Price per ticket</label>
              <Input
                type="number"
                id="price"
                name="price"
                onChange={handleChange}
              ></Input>
            </div>
            <div className="form-field">
              <label htmlFor="contactNumber">Contact Number</label>
              <Input
                type="number"
                id="contactNumber"
                name="contactNumber"
                onChange={handleChange}
              ></Input>
            </div>
            <div className="form-field">
              <button className="create-event-button" onClick={handleSubmit} type='submit'>
                Create Event
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     createEvent: event => dispatch(createEvent(event))
//   };
// };

const mapDispatchToProps = {
  createEvent
};

export default connect(null, mapDispatchToProps)(CreateEvent);

// export default CreateEvent;
