import UsersService from "#root/adapters/UserService"
import { ResolverContext } from "#root/graphql/types";

interface Args {
  username: string;
  password: string;
}

const createUserSessionResolver =  async (obj:any, { password, username}: Args, context: ResolverContext) => {
  try {
    const userSession = await UsersService.createUserSession({ password, username });
    
    context.res.cookie('userSessionId', userSession.id, { httpOnly: true});
    
    return userSession;
    
  } catch (error) {
    throw new Error("Server Error")
  }
}

export default createUserSessionResolver;