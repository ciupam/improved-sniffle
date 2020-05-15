import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import bcrypt from "bcryptjs";
import ExpressContext from "../../types/ExpressContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: ExpressContext,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return null;

    ctx.req.session!.userId = user.id;

    return user;
  }
}
