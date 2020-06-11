import { MiddlewareFn } from "type-graphql";
import MyContext from "../../types/MyContext";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../util/env";

const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authorized");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, ACCESS_TOKEN_SECRET);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("not authorized");
  }

  return next();
};

export default isAuth;
