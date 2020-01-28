import React from "react";
import "./Header.css";
import { connect } from "react-redux";
import { signOut } from "./../../actions";
import { Menu, Dropdown, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  let history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/createEvent">Create Event</NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="1"
        onClick={() => {
          history.push("/homePage");
          props.signOut();
        }}
      >
        Sign Out
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <NavLink to="/MyEvents">My Events</NavLink>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <header>
        <h1>EVENTS</h1>
        <div className="buttons">
          {props.uid ? (
            <div className="signed-in-header-button">
              <div className="signed-in-div">
                <div className="initials">
                  {props.name && props.name.split(" ")[0][0]}
                </div>
              </div>
              <Dropdown overlay={menu} visible={isOpen} placement="bottomRight">
                <button
                  className="profile-name"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  {props.name}
                  <Icon type="caret-down" className="caret-down-icon" />
                </button>
              </Dropdown>
            </div>
          ) : (
            <>
              {" "}
              <div className="signed-out-header-buttons">
                <NavLink to="/login">
                  <button type="primary" className="header-button signIn">
                    Sign In
                  </button>
                </NavLink>
                ;{" "}
                <NavLink to="/register">
                  <button className="header-button sign-up">Register</button>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

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
    // error: state.errorReducer,
    name: state.firebase.profile.name
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
