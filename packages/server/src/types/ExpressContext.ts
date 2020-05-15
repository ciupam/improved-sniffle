import { Request } from "express";

export default interface ExpressContext {
  req: Request;
}
