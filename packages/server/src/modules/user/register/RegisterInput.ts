import { Length } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(2, 35)
  firstName: string;

  @Field()
  @Length(2, 35)
  lastName: string;

  @Field()
  @IsEmailAlreadyExist({ message: "Email already in use" })
  email: string;

  @Field()
  @Length(8, 100)
  password: string;
}
