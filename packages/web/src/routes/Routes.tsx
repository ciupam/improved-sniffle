import React from "react";
import { useHelloQuery } from "../generated/graphql";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Register, Login, Home } from "./";

const Routes: React.FC = () => {
  const { data, loading } = useHelloQuery();

  return (
    <BrowserRouter>
      <header>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
