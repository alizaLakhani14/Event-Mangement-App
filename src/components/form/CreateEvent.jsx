import { useHistory } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import React from "react";
import { Input } from "antd";
import { Upload, Button, Icon } from "antd";
import { Formik } from "formik";
import "./CreateEvent.css";
import { connect } from "react-redux";
import { createEvent, uploadImage } from "./../../actions";
const { TextArea } = Input;

const CreateEvent = props => {
  console.log(props, "This is props");
  const imageUpload = file => {
    // console.log(file);
    props.uploadImage(file.file.originFileObj);
  };

  const handleSelect = async value => {};

  let history = useHistory();
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
        // console.log({ ...values, url: props.url });
        history.push("/");
        props.createEvent({ ...values, url: props.url });
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
              <button
                className="create-event-button"
                onClick={handleSubmit}
                type="submit"
              >
                Create Event
              </button>
            </div>
            <Upload onChange={imageUpload}>
              <Button>
                <Icon type="upload" /> Upload
              </Button>
            </Upload>
            <PlacesAutocomplete
              value={values.place}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <>
                  <Input
                    // onChange={handleChange}
                    // value={values.place}
                    // type="text"
                    // name="place"
                    {...getInputProps({
                      placeholder: "Type your address"
                    })}
                  ></Input>
                  <div>{loading ? <div>...loading</div> : null}</div>
                  {suggestions.map(suggestion => {
                    return <div>{suggestion.description}</div>;
                  })}
                </>
              )}
            </PlacesAutocomplete>
          </form>
        </div>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    url: state.imageUpload.url
  };
};
const mapDispatchToProps = {
  createEvent,
  uploadImage
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);

// export default CreateEvent;
