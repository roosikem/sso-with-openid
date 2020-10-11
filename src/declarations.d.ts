import { Issuer, Client } from "openid-client";
import { IAuthCookie } from "./types";

declare global {
  namespace Express {
    export interface Request {
      // I am using auth instead of locals becuase I cannot statically type
      // locals, so to keep things statically analyzable I am using other attr
      auth?: {
        issuer?: Issuer;
        client?: Client;
        session?: IAuthCookie;
      };
    }
  }
}