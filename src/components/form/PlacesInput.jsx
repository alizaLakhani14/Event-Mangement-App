import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input } from "antd";

const PlacesInput = () => {
  const [address, setAddress] = React.useState("");

  // const handleSelect = address => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => {
  //       this.setState(() => {
  //         this.props.form.setFieldValue(this.state.name, {
  //           value: address,
  //           address,
  //           coordinates: latLng
  //         });
  //         return { address };
  //       });
  //     })
  //     .catch(error => this.props.form.setFieldError(this.state.name, error));
  // };
  const handleSelect = async value => {};
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <Input
              style={{
                height: "50px",
                width: "400px",
                margin: "1em"
              }}
              {...getInputProps({
                placeholder: "Type your address"
              })}
            ></Input>
            <div>{loading ? <div>...loading</div> : null}</div>
            {suggestions.map(suggestion => {
              return (
                <div {...getSuggestionItemProps}>{suggestion.description}</div>
              );
            })}
          </>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default PlacesInput;
