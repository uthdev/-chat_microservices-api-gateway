import { NextFunction, Response, Request } from "express";

import UsersService from "#root/adapters/UserService";

const injectSession = async (req:Request, res: Response, next: NextFunction) => {
  if(req.cookies.userSessionId) {
    const userSession = await UsersService.fetchUserSession({sessionId: req.cookies.userSessionId})
    
    res.locals.userSession = userSession;
  }

  return next();
}

export default injectSession;