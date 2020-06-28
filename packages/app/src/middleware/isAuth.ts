import { NextHandleFunction } from "connect";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../util/env";

const isAuth: NextHandleFunction = (req, res, next) => {
  const authorization = req.headers["authorization"];

  try {
    if (!authorization) {
      throw new Error("not authorized");
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new Error("not authorized");
    }

    verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    res.statusCode = 401;
    return res.end("not authorized");
  }

  return next();
};

export default isAuth;
