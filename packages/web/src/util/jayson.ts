import jaysonBrowserClient from "jayson/lib/client/browser";
import { getAccessToken } from "./auth";

const callServer = async (request: any, callback: any) => {
  const options = {
    method: "POST",
    body: request,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${getAccessToken()}`,
    },
  };

  try {
    const response = await fetch("http://localhost:5000", options);

    if (!response.ok) {
      throw new Error("callServer response not ok");
    }

    const data = await response.text();

    callback(null, data);
  } catch (err) {
    console.log(err);
  }
};

const client = new jaysonBrowserClient(callServer, {});

export const add = () => {
  client.request("add", [1, 1], (err: any, res: any) => {
    console.log("hmmm");
    if (err) throw err;
    console.log(res);
  });
};
