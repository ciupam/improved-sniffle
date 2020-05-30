import { sign } from "jsonwebtoken";
import { User } from "../entity/User";
import { Response } from "express";

export const getAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });

export const getRefreshToken = (user: User) =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    },
  );

export const sendRefreshToken = (res: Response, token: string) => {
  // cookie expires in 7 days
  res.cookie("jid", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};
