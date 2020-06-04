import React from "react";
import { useHelloQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data, error, loading } = useHelloQuery();

  return (
    <div>
      {!!error ? "error" : !!loading ? "loading..." : !!data ? data.hello : ""}
    </div>
  );
};

export default Home;
