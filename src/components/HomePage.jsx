import React, { Component } from "react";
import "antd/dist/antd.css";
import "./HomePage.css";
import { Layout, Button, Carousel, Alert } from "antd";
import event1 from "./../images/event1.jpg";
import event2 from "./../images/event2.jpg";
import event3 from "./../images/event3.jpg";
import event4 from "./../images/event4.jpg";
import EventList from "./events/EventList";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, createEvent } from "./../actions";
import DropDown from "./DropDown";

class HomePage extends Component {
  render() {
    const { uid, events, history, error } = this.props;
    return (
      <div className="App">
        <Layout className="layout-style">
          <header>
            <h1>LAKHANI EVENTS</h1>
            <div className="buttons">
              {uid ? (
                <>
                  {" "}
                  <NavLink to="/createEvent">
                    <Button type="primary" className="header-button">
                      Create Event
                    </Button>
                  </NavLink>
                  <Button type="primary" onClick={this.props.signOut}>
                    Sign Out
                  </Button>
                  <Button
                    type="primary"
                    style={{ margin: "5px" }}
                    onClick={() => {
                      this.props.events && this.props.history.push("/MyEvents");
                    }}
                  >
                    My Events
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <NavLink to="/login">
                    <Button type="primary" className="header-button">
                      Sign In
                    </Button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="header-button sign-up">Register</button>
                  </NavLink>
                </>
              )}
            </div>
            <DropDown />
          </header>

          <section className="carousel">
            <Carousel autoplay>
              <div>
                <img src={event1} alt="img" />
              </div>
              <div>
                <img src={event2} alt="img" />
              </div>
              <div>
                <img src={event3} alt="img" />
              </div>
              <div>
                <img src={event4} alt="img" />
              </div>
            </Carousel>
          </section>
          <section className="events-list">
            <h1>Events</h1>
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

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut());
    }
  };
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    events: state.firestore.ordered.Events,
    error: state.errorReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
