import { useHistory } from "react-router-dom";
import React from "react";
import { Input } from "antd";
import { Upload, Button, Icon } from "antd";
import { Formik } from "formik";
import "./CreateEvent.css";
import { connect } from "react-redux";
import { createEvent, uploadImage } from "./../../actions";
import PlacesInput from "./PlacesInput";

const CreateEvent = props => {
  let history = useHistory();

  console.log(props, "props");

  let uploader;
  const imageUpload = file => {
    console.log(file.fileList);
    uploader = file.fileList;
    // console.log(uploader, "Uploaded File");
    // console.log(file.file, "Final");
    // props.uploadImage(file.file.originFileObj);
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
        // uploader: []
      }}
      onSubmit={async values => {
        const urls = await props.uploadImage(uploader, values.name);

        props.createEvent({
          ...values,
          images: urls
        });
        props.history.push("/");
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
          <h1 className="create-event-heading">Create Event</h1>
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
                  autoSize={true}
                  maxLength={1000}
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
                </button>
              </div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </form>
          </div>
        </>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    url: state.imageUpload.url,
    createrId: state.firebase.auth.uid,
    imageUpload: state.imageUpload,
    fetchedValues: state.updateEvent
  };
};
const mapDispatchToProps = {
  createEvent,
  uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
