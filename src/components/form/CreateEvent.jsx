import React from "react";
import { Input } from "antd";
import { Formik } from "formik";
import "./CreateEvent.css";
import { connect } from "react-redux";
import Action from "./../../actions/index";
const { TextArea } = Input;

const CreateEvent = props => {
  console.log(props.createEvent)
  return (
    <Formik
      initialValues={{
        eventName: "",
        maxMembers: "",
        description: "",
        price: "",
        contactNumber: ""
      }}
      onSubmit={values => {
         return props.createEvent(values)
        console.log(values);
        // props.createEvent(values);
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
                id="eventName"
                name="eventName"
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
              <button className="create-event-button" onClick={handleSubmit}>
                Create Event
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createEvent: event => dispatch(Action(event))
  };
};

export default connect(null, mapDispatchToProps)(CreateEvent);

// export default CreateEvent;
