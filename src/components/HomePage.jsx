import React, { Component } from "react";
import "antd/dist/antd.css";
import "./HomePage.css";
import { Layout, Alert } from "antd";
import EventList from "./events/EventList";
import { connect } from "react-redux";
import Header from "./Header/Header";

class HomePage extends Component {
  render() {
    const { error } = this.props;
    return (
      <div className="App">
        <Layout className="layout-style">
          <Header />
          <section className="events-list">
            <EventList />
          </section>
          <div className="error-div">
            {this.props.error === true && (
              <Alert
                style={{
                  margin: "1em",
                  width: "300px",
                  textAlign: "center"
                }}
                type="error"
                message="Something went wrong."
              ></Alert>
            )}
          </div>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.errorReducer
  };
};

export default connect(mapStateToProps)(HomePage);
