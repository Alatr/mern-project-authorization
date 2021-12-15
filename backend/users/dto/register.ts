import { IsEmail, IsString } from "class-validator";

export class UserRegistrationDto {
  @IsEmail({}, { message: "wrong email" })
  email: string;

  @IsString({ message: "empty name" })
  name: string;

  @IsString({ message: "empty password" })
  password: string;
}
