import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login/Login";
import Timesheet from "./pages/Timesheet/Timesheet";


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/timesheet" component={Timesheet} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
