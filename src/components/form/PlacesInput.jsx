import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input } from "antd";
import { connect } from "react-redux";
import "./PlacesInput.css";

const PlacesInput = ({ setFieldValue, placesField }, props) => {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    console.log(value);
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(latLng);
    setFieldValue("places", latLng);
  };

  const handleChange = (address) => {
    setAddress(address);
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <Input
              style={{
                height: "32px",
              }}
              {...getInputProps({
                placeholder: "Type your address",
              })}
            ></Input>
            <div>{loading ? <div>...loading</div> : null}</div>
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              const style = suggestion.active
                ? {
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                    padding: "5px",
                    borderBottom: "1px solid #d9d9d9",
                    borderLeft: "1px solid #d9d9d9",
                    borderRight: "1px solid #d9d9d9",
                  }
                : {
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    padding: "5px",
                    borderBottom: "1px solid #d9d9d9",
                    borderLeft: "1px solid #d9d9d9",
                    borderRight: "1px solid #d9d9d9",
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedValues: state.updateEvent[0],
  };
};
export default connect(mapStateToProps)(PlacesInput);
