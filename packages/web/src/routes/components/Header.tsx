import React from "react";
import { Link } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { setAccessToken } from "../../util/auth";

const Header: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  return (
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
      <div>
        <button
          onClick={async () => {
            await logout();
            setAccessToken("");
            await client?.resetStore();
          }}
        >
          logout
        </button>
      </div>

      {!loading && !!data && !!data.me ? (
        <div>You are logged in as: {data.me.email}</div>
      ) : null}
    </header>
  );
};

export default Header;
