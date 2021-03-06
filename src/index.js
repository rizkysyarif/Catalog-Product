import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import Login from "views/Login.jsx";
import AdminLayout from "layouts/Admin.jsx";
import Register from "./views/Register";
import store from './Public/Redux/store'

ReactDOM.render(
    <Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/login" component={Login} name="Login"/>
      <Route path="/register" component={Register} name="Register"/>
      <Redirect from="/" to="/admin/index" />
    </Switch>
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
);
