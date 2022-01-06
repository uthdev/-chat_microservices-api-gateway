import UsersService from "#root/adapters/UserService"

interface Args {
  username: string;
  password: string;
}

const createUserResolver =  async (obj:any, { password, username}: Args) => {
  return await UsersService.createUser({ password, username })
}

export default createUserResolver;