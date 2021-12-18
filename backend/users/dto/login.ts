import { IsEmail, IsString } from "class-validator";
export class UserLoginDto {
  @IsEmail({}, { message: "wrong email or password" })
  email: string;

  @IsString({ message: "wrong email or password" })
  password: string;
}
