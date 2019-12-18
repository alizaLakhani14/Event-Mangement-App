import React, { Component } from "react";
import HomePage from "./components/HomePage";
import LoginForm from "./components/form/LoginForm";
import RegisterForm from "./components/form/RegisterForm";
import CreateEvent from "./components/form/CreateEvent";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/createEvent" component={CreateEvent}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
