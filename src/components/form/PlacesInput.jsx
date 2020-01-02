import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input } from "antd";
import "./PlacesInput.css";

const PlacesInput = ({ setFieldValue }) => {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(latLng);
    setFieldValue("places", latLng);
  };

  const handleChange = address => {
    setAddress(address);
  };
  // const handleClick = value => {
  //   setAddress(value);
  // };
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
                height: "32px"
              }}
              {...getInputProps({
                placeholder: "Type your address"
              })}
            ></Input>
            <div>{loading ? <div>...loading</div> : null}</div>
            {suggestions.map(suggestion => {
              return (
                <div
                  // onClick={() => {
                  //   handleClick(suggestion.description);
                  // }}
                  {...getSuggestionItemProps}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default PlacesInput;
