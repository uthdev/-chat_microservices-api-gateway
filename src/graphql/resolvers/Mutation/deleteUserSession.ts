import UsersService from "#root/adapters/UserService"
import { ResolverContext } from "#root/graphql/types";

interface Args {
  me: boolean;
}

const deleteUserSessionResolver =  async (obj:any, args: Args, context: ResolverContext) => {
  if(args.me !== true) throw new Error("Unsupported argument value");
  
  const sessionId =  context.res.locals.userSession.id
  console.log(sessionId);
  try {
    await UsersService.deleteUserSession({ sessionId });
    
    context.res.clearCookie("userSessionId")
    
    return true;
  } catch (error) {
    throw new Error("No session")
  }
}

export default deleteUserSessionResolver;