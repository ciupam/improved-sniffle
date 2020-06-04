import React, { useState, useEffect } from "react";
import Routes from "./routes";
import { setAccessToken } from "./util/auth";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include",
      });

      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routes />;
};

export default App;
