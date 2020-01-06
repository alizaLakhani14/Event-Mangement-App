import React from "react";
import { Carousel } from "antd";
import { connect } from "react-redux";

const CarouselComponent = props => {
    c
  return <div></div>;
};
const mapStateToProps = state => {
  return {
    images: state.firestore.ordered.Events.images
  };
};
export default connect(mapStateToProps)(CarouselComponent);
