import { useHistory } from "react-router-dom";
import React from "react";
import { Input } from "antd";
import { Upload, Button, Icon, Alert } from "antd";
import { Formik } from "formik";
import "./CreateEvent.css";
import { connect } from "react-redux";
import { createEvent, uploadImage } from "./../../actions";
import PlacesInput from "./PlacesInput";
import Header from "./../Header/Header";

const CreateEvent = props => {
  // let history = useHistory();

  console.log(props, "props");

  let uploader;
  const imageUpload = file => {
    console.log(file.fileList);
    uploader = file.fileList;
  };

  return (
    <Formik
      initialValues={{
        name: "",
        maxMembers: "",
        description: "",
        price: "",
        contactNumber: "",
        places: ""
    
      }}
      onSubmit={async values => {
        const urls = await props.uploadImage(uploader, values.name);

        props.createEvent({
          ...values,
          creator: props.creatorId,
          images: urls
        });
        props.history.push("/homePage");
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
        <>
          <Header />
     
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
                  value={values.name}
                ></Input>
              </div>
              <div className="form-field">
                <label htmlFor="maxMembers">Maxium Members</label>
                <Input
                  type="number"
                  id="maxMembers"
                  name="maxMembers"
                  onChange={handleChange}
                  value={values.maxMembers}
                ></Input>
              </div>
              <div className="form-field">
                <label htmlFor="description">Event Description</label>
                <Input.TextArea
                  placeholder="Describe your event...."
                  type="text"
                  id="description"
                  name="description"
                  // autoSize={true}
                  autoSize={{ minRows: 1, maxRows: 7 }}
                  onChange={handleChange}
                  value={values.description}
                ></Input.TextArea>
              </div>
              <div className="form-field">
                <label htmlFor="price">Price per ticket</label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  onChange={handleChange}
                  value={values.price}
                ></Input>
              </div>
              <div className="form-field">
                <label htmlFor="contactNumber">Contact Number</label>
                <Input
                  type="number"
                  id="contactNumber"
                  name="contactNumber"
                  onChange={handleChange}
                  value={values.contactNumber}
                ></Input>
              </div>

              <div className="form-field">
                <label>Venue</label>
                <PlacesInput setFieldValue={setFieldValue} />
              </div>
              <div className="form-field">
                <Upload onChange={imageUpload} multiple>
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>
              </div>
              <div className="form-field">
                <button
                  className="create-event-button"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Create Event
                  {props.loading === true && (
                    <Icon
                      type="loading"
                      style={{ color: "white", margin: "3px" }}
                    ></Icon>
                  )}
                </button>
              </div>
            </form>
            <div className="error-div">
              {props.error === true && (
                <Alert
                  style={{
                    margin: "1em",
                    width: "300px",
                    textAlign: "center"
                  }}
                  type="error"
                  message="Something went wrong"
                ></Alert>
              )}
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    url: state.imageUpload.url,
    creatorId: state.firebase.auth.uid,
    imageUpload: state.imageUpload,
    fetchedValues: state.updateEvent,
    loading: state.loadingReducer,
    error: state.errorReducer
  };
};
const mapDispatchToProps = {
  createEvent,
  uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
