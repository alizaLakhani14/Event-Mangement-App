import { useHistory } from "react-router-dom";
import React from "react";
import { Input } from "antd";
import { Upload, Button, Icon } from "antd";
import { Formik } from "formik";
import "./CreateEvent.css";
import { connect } from "react-redux";
import { updateValues, uploadImage } from "./../../actions";
import PlacesInput from "./PlacesInput";
import Header from './../Header/Header';

const CreateEvent = props => {
  let history = useHistory();

 

  let uploader;
  const imageUpload = file => {
    console.log(file.fileList);
    uploader = file.fileList;
  };

  return (
    <Formik
      initialValues={{
        name: props.obj && props.obj.name,
        maxMembers: props.obj && props.obj.maxMembers,
        description: props.obj && props.obj.description,
        price: props.obj && props.obj.price,
        contactNumber: props.obj && props.obj.contactNumber,
        places: ""
       
      }}
      onSubmit={values => {
        props.updateValues(
          props.obj.id,
          values.name,
          values.description,
          values.price,
          values.maxMembers,
          values.contactNumber,
          values.places,
          history
        );
        props.isUpdated === true && props.history.push("/MyEvents");
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
        <Header/>
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
                  Save
                
                </button>
              </div>
              
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
    obj: state.updateEvent[0],
    isUpdated: state.updateEvent.isUpdated,
    loading: state.loadingReducer
  };
};
const mapDispatchToProps = {
  updateValues,
  uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
