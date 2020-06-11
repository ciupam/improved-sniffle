import express from "express";
import { verify } from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../util/env";
import {
  getAccessToken,
  sendRefreshToken,
  getRefreshToken,
} from "../util/auth";
import { User } from "../entity/User";

const refreshTokenRouter = express.Router();

refreshTokenRouter.post("/refresh_token", async (req, res) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;

  try {
    payload = verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await User.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, getRefreshToken(user));

  return res.send({ ok: true, accessToken: getAccessToken(user) });
});

export default refreshTokenRouter;
