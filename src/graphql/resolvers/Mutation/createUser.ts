import UsersService from "#root/adapters/UserService"

interface Args {
  username: string;
  password: string;
}

const createUserResolver =  async (obj:any, { password, username}: Args): Promise<{ user: Args, status: string | number}> => {
  try {
    const user =  await UsersService.createUser({ password, username })

    return user;
  } catch (error) {
    throw new Error("Unsuccessful")
  }
}

export default createUserResolver;