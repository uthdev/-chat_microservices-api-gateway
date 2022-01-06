import { Response, Request } from "express";

import { UserSession } from "#root/adapters/UserService";

export interface ResolverContext {
  req: Request;
  res: Response;
}

export interface UserSessionType extends UserSession {

}
