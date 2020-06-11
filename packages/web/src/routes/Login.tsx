import React, { useState } from "react";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../util/auth";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  return (
    <div>
      Login page
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const response = await login({
            variables: { email, password },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }

              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data.login.user,
                },
              });
            },
          });

          console.log(response);

          if (!!response && !!response.data) {
            setAccessToken(response.data.login.accessToken);
          }
        }}
      >
        <div>
          <input
            value={email}
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
