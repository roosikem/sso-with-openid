import type { Request, Response } from "express";
import { generators } from "openid-client";
import { fromBase64, toBase64 } from "./encoding";

export const STATE_COOKIE = "state";

export interface IState {
  backToPath: string;
  bytes: string;
}

export function serializeAuthState(state: Partial<IState>): string {
  // probably you would base64 encode this
  return toBase64({
    ...state,
    bytes: generators.state(),
  });
}

export function deserializeAuthState(value: string): IState {
  return fromBase64(value);
}

export function setAuthStateCookie(res: Response, state: string): void {
  res.cookie(STATE_COOKIE, state, {
    // no access from javascript
    httpOnly: true,
    // only access from our site
    sameSite: true,
    // recommended when not running in localhost
    //secure: true
  });
}

export function getAuthStateCookie(req: Request): string {
  return req.cookies[STATE_COOKIE];
}
