import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register, Login, Home } from "./";
import { Header } from "./components";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
