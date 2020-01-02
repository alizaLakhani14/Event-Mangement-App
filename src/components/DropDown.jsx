import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "./../actions";
import "./DropDown.css";

const DropDown = props => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/createEvent">Create Event</NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={props.signOut}>
        Sign Out
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <NavLink to="/MyEvents">My Events</NavLink>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="drop-down">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Icon
          type="more"
          style={{
            fontSize: "20px",
            margin: "4px"
          }}
        />
      </Dropdown>
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

export default connect(null, mapDispatchToProps)(DropDown);
